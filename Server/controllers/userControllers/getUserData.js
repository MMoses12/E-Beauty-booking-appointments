import pool from "../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

async function getUserData (req, res) {    
    let token = req.headers.authorization
    let username
    let sql = await pool.connect()

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

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        username = decoded.username

        const dbUser = await sql.query("SELECT firstname, lastname, phone FROM user_data WHERE username = $1", [username])

        return res.status(200).json({ userData: dbUser.rows[0] });
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        res.status(402).json({ error: "error"})
        return;
    } finally {
        sql.release()
    }
}

export default getUserData