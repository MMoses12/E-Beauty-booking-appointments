// Imports.
import pool from "../../config/db.js"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { SMTPClient } from "emailjs"

dotenv.config();

// Send an one time password to the user's email
// before inserting the user in the database and insert
// it in the appropriate table in the database. 
async function sendPassword (req, res) {
	let hashKey, dbUser, dbOTP, code

	const username = req.body.username
	const email = req.body.email

	const sql = await pool.connect()

    // Find if the user has already an account.
	try {
		// Check if an account with the same email or username already exists.
		dbUser = await sql.query('SELECT username FROM user_data WHERE username LIKE $1 OR email LIKE $2', [username, email])
		if (dbUser.rows.length != 0) {
			if (dbUser.rows[0]["username"] === username) {
				return res.status(406).json({"sendOTP":"usernameExists"})
			}
			else {
				return res.status(406).json({"sendOTP":"emailExists"})
			}
		}

		// Make the one time password.
		code = Math.floor(Math.random() * (9000 - 1000 + 1) + 1000)

		// Send the email with the password.
		const client = new SMTPClient({
			user: process.env.MAIL_USER,
			password: process.env.MAIL_PASS,
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			tls: true
		})
	
		const message = {
			text: `Your one-time password is: ${code}`,
			from: process.env.MAIL_USER,
			to: email,
			subject: "Register one-time password",
		}
  
		await new Promise((resolve, reject) => {
			client.send(message, (err, message) => {
				if (err) {
					reject(err)
				} 
				else {
					resolve()
				}
			});
		}); 

		// Hash the one time password and save it in the database.
		hashKey = await bcrypt.hash(code.toString(), 10)
		const expirationDate = new Date(Date.now())

		dbOTP = await sql.query('SELECT email FROM register_password WHERE email LIKE $1', [email])

		// Insert or change the otp.
		if (dbOTP.rows.length == 0)    
			await sql.query('INSERT INTO register_password VALUES ($1, $2, $3)', [email, hashKey, expirationDate])
		else
			await sql.query('UPDATE register_password SET created_at = $1, code = $2 WHERE email = $3', [expirationDate, hashKey, email])
	} catch (error) {
		console.error("Error executing query or connecting to the database: ", error.message)
		return res.status(500)
	}

	return res.status(200).json({"sendOTP":"sentSuccessfully"})
}

// Check if the one time password the user
// inserted is correct.
async function checkPassword (req, res) {
	let dbOTP

	let otp = req.body.otp
	const email = req.body.email

	const sql = await pool.connect()

    // Take the one time password from the database.
	try {
		// Find the otp.
		dbOTP = await sql.query('SELECT * FROM register_password WHERE email LIKE $1', [email])
		if (dbOTP.rows.length == 0) {
			res.status(401).json({ checkOTP: "notExist"})
			return;
		}
		
		// Check if the password has expired.
		const dateNow = new Date(Date.now())
		const timestamp = Date.parse(dbOTP.rows[0]["created_at"]) + 1000 * 60 * 5
		const dateExpire = new Date(timestamp)
		
		if (dateExpire < dateNow) {
			return res.status(401).json({ checkOTP:"expired"})
		}

		// Compare the password with the password the user inputs.
		let result = await bcrypt.compare(otp.toString(), dbOTP.rows[0]["code"])
		if (!result) {
			return res.status(401).json({ checkOTP:"false"})
		}
	} catch (error) {
		console.error("Error executing query or connecting to the database: ", error.message)
		return res.status(500)
	}

	res.status(200).json({ checkOTP:"true" })
}

export default sendPassword
export { checkPassword }