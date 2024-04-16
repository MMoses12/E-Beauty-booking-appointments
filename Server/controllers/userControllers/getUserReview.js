import pool from "../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

async function getUserReviews (req, res) {
    let reviews
    let token = req.headers.authorization
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
        const username = decoded.username
        // Execute the query
        reviews = await sql.query('SELECT s.storename, reviewtext, rating FROM review r INNER JOIN store s ON r.store = s.id WHERE r.username LIKE $1', [username])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        res.status(500).json({"getUserReviews":"error"})
        return
    } finally {
        // Release the client back to the pool
        sql.release()
    }

    res.status(200).json({ userReviews: reviews.rows})
}

export default getUserReviews