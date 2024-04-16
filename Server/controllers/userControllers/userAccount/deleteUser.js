// Imports.
import pool from "../../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Delete user's account
async function DeleteUser(req, res) {
    // Check if user's token is valid.
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }
    
    // Delete user's account.
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const username = decoded.username

        const sql = await pool.connect()
    
        await sql.query('DELETE FROM user_data WHERE username LIKE $1', [username])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(404).json({ error: "Not found" })
    } finally {
        sql.release()
    }

    res.json( {"deleteUser":"deleted"} )
}

export default DeleteUser
