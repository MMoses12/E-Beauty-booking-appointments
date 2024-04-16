// Imports.
import pool from "../../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Change the password for a specific user.
// The password is encrypted with 10 rounds of salt hash.
async function EmailChange (req, res) {
    // Check if user's token is valid.
    let token = req.headers.authorization
    let dbUser, username

    if (!token) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }

    token = token.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        username = decode.username
    } catch (error) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }

    const newEmail = req.body.newUsername

    const sql = await pool.connect()
    if (!newEmail) {
        return res.status(406)
    }

    // Find the user.
    try {
        // Execute the query
        dbUser = await sql.query('SELECT email FROM user_data WHERE email LIKE $1', [newEmail])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500)
    }
    
    if (dbUser.rows.length !== 0) {
        return res.status(500).json({ error: "Username exists" })
    }

    try {
        await sql.query('UPDATE user_data SET email = $1 WHERE username LIKE $2', [newEmail, username])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500)
    } finally {
        // Release the client back to the pool
        sql.release()
    }

    res.status(200).json({ changeEmail: "changed" })
}

export default EmailChange