import pool from "../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

async function getSumData (req, res) {    
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

        const favourites = await sql.query("SELECT count(*) FROM favourite WHERE username = $1", [username])
        const appointments = await sql.query("SELECT count(*) FROM appointment WHERE username = $1", [username])
        const reviews = await sql.query("SELECT count(*) FROM review WHERE username = $1", [username])

        return res.status(200).json({ favourites: favourites.rows, appointments: appointments.rows, reviews: reviews.rows })
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        res.status(402).json({ error: "error"})
        return;
    } finally {
        sql.release()
    }
}

export default getSumData