// Imports.
import pool from "../../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Change the password for a specific user.
// The password is encrypted with 10 rounds of salt hash.
async function ChangeData(req, res) {
    // Check if user's token is valid.
    let token = req.headers.authorization
    let username

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access" })
    }

    token = token.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        username = decode.username
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized access" })
    }

    const { firstName, lastName, phone } = req.body

    if (!firstName && !lastName && !phone) {
        return res.status(400).json({ error: "At least one field (firstName, lastName, or phone) must be provided" })
    }

    const sql = await pool.connect()

    try {
        let query = "UPDATE user_data SET"
        let queryParams = []
        if (firstName) {
            query += " firstname = $1,"
            queryParams.push(firstName)
        }
        if (lastName) {
            query += " lastname = $2,"
            queryParams.push(lastName)
        }
        if (phone) {
            query += " phone = $3,"
            queryParams.push(phone)
        }
        // Remove the trailing comma
        query = query.slice(0, -1) + " WHERE username = $4"
        queryParams.push(username)

        await sql.query(query, queryParams)
        return res.status(200).json({ message: "User data updated successfully" })
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    } finally {
        // Release the client back to the pool
        sql.release()
    }
}

export default ChangeData
