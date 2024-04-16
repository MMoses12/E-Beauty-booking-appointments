// Imports.
import pool from "../../../config/db.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Change the password for a specific user.
// The password is encrypted with 10 rounds of salt hash.
async function PasswordChange (req, res) {
    // Check if user's token is valid.
    let token = req.headers.authorization
    let dbUser, hashKey, username

    if (!token) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }

    token = token.split(' ')[1]

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }

    // Get the password and new password from request body.
    const password = req.body.password
    const newPassword = req.body.newPassword

    const sql = await pool.connect()
    if (!password || !newPassword) {
        return res.status(406)
    }

    // Find the user.
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        username = decoded.username

        // Execute the query
        dbUser = await sql.query('SELECT username, password FROM user_data WHERE username LIKE $1', [username])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500)
    }
    
    // Check if the password is correct.
    let result
    result = await bcrypt.compare(password, dbUser.rows[0]["password"])
    if (result == false) {
        return res.status(401).json({ "changePassword":"passwordNotMatch" })
    }
    // Encrypt password and change it.
    else {
        try {
            hashKey = await bcrypt.hash(newPassword, 10)
            dbUser = await sql.query('UPDATE user_data SET password = $1 WHERE username LIKE $2', [hashKey, username])
        } catch (error) {
            console.error("Error executing query or connecting to the database: ", error.message)
            return res.status(500)
        } finally {
            // Release the client back to the pool
            sql.release()
        }
    }
    
    res.status(200).json({ "changePassword":"changed" })
}

export default PasswordChange