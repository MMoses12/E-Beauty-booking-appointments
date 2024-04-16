import pool from "../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Submit the review of a user for a store.
async function getAllReviews (req, res) {
    // Check user's token.
    let token = req.headers.authorization

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
    
    // Get the data from the request body.
    let storeID = req.body.storeID
    let reviews

    const sql = await pool.connect()

    try {
        // Execute the query
        reviews = await sql.query('SELECT * FROM review WHERE store = $1', [storeID]);
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        res.status(500).json({ getReviews: "error"});
        return;
    }

    res.status(200).json({ getReviews: reviews.rows});
}

export default getAllReviews;