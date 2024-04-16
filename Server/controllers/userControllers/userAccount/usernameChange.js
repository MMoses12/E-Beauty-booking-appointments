// Imports.
import pool from "../../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Change the password for a specific user.
// The password is encrypted with 10 rounds of salt hash.
async function UsernameChange (req, res) {
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

    const newUsername = req.body.newUsername

    const sql = await pool.connect()
    if (!newUsername) {
        return res.status(406)
    }

    // Find the user.
    try {
        // Execute the query
        dbUser = await sql.query('SELECT username FROM user_data WHERE username LIKE $1', [newUsername])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500)
    }

    if (dbUser.rows.length !== 0) {
        return res.status(500).json({ error: "Username exists" })
    }

    try {
        await sql.query('UPDATE user_data SET username = $1 WHERE username LIKE $2', [newUsername, username])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500)
    } finally {
        // Release the client back to the pool
        sql.release()
    }

    res.status(200).json({ changeUsername: "changed" })
}

export default UsernameChange