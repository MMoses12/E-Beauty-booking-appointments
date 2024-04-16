import pool from "../../config/db.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Submit the review of a user for a store.
async function submitRating (req, res) {
    // Check user's token.
    let token = req.headers.authorization
    let username
    
    if (!token) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }

    token = token.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        username = decoded.username
    } catch (error) {
        res.status(401).json({ error: "Unauthorized access" })
        return
    }

    // Get data from request body.
    let storeID = req.body.storeID
    let review = req.body.review
    let rating = req.body.rating

    // If one of the needed variables is not in user's input.
    if (!storeID || !rating) {
        res.status(406).json({"submitReview":"wrongInputFormat"});
        return;
    }

    // Query return variables.
    let avgRating;
    let dbUser;

    const sql = await pool.connect();

    // Find if the user has already made a review for this store.
    try {
        // Execute the query
        dbUser = await sql.query('SELECT username FROM review WHERE username LIKE $1 AND store = $2', [username, storeID]);
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        res.json({"submitReview":"error"});
        return;
    }

    if (dbUser.rows.length === 0) {
        try {
            // Execute the query    
            await sql.query('INSERT INTO review (store, username, rating, reviewtext) VALUES ($1, $2, $3, $4)', [storeID, username, rating, review]);
        } catch (error) {
            console.error("Error executing query or connecting to the database: ", error.message);
            res.json({"submitReview":"error"});
            return;
        }
    }
    else {
        try {
            // Execute the query    
            await sql.query('UPDATE review SET rating = $1, reviewtext = $2 WHERE username LIKE $3 AND store = $4', [rating, review, username, storeID]);
        } catch (error) {
            console.error("Error executing query or connecting to the database: ", error.message);
            res.json({"submitReview":"error"});
            return;
        }
    }

    // Update the average rating of the store.
    try {
        // Execute the query
        avgRating = await sql.query('SELECT avg(rating) FROM review WHERE store = $1', [storeID]);
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        res.json({"submitReview":"error"});
        return;
    }

    avgRating = avgRating.rows[0].avg;

    try {
        // Execute the query
        await sql.query('UPDATE store SET avg_rating = $1 WHERE id = $2', [avgRating, storeID]);
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        res.json({"submitReview":"error"});
        return;
    } finally {
        // Release the client back to the pool
        sql.release();
    }

    res.json({"submitReview":"completed"});
}

export default submitRating;