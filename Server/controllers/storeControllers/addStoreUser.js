// Imports
import pool from "../../config/db.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

// Register the user data in the database.
async function registerStoreUser (req, res) {
	let hashKey

    // Get the user's register data from
    // request body.
	const username = req.body.username
	const password = req.body.password
	const email = req.body.email

    if (!email || !username || !password) {
        return res.status(401).json({ "register":"error" })
    }

	const sql = await pool.connect()

    // Insert the data in the database.
    // Encrypt using hash the password to be safe.
	try {
		hashKey = await bcrypt.hash(password, 10)
		await sql.query('INSERT INTO user_data (username, email, password, hasStore) VALUES ($1, $2, $3, $4)', [username, email, hashKey, true])
	} catch (error) {
		console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500).json({ "register":"error" })
	}

    try {
        sql.query("DELETE FROM register_password WHERE email LIKE $1", [email])
    } catch (error) {
		console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500).json({"register":"error"})
	}

	res.status(200).json({ "register":"true" })
}

export default registerStoreUser