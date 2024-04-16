// Imports.
import pool from "../../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Add a specific store into the user's favourites.
async function AddFavourites (req, res) {
    // Check if the user has a valid token.
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

    // Add the store into user's favourites.
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const username = decoded.username

        const store = req.body.storeID

        const sql = await pool.connect()
    
        await sql.query('INSERT INTO FAVOURITE (username, store) VALUES ($1, $2)', [username, store]);
        sql.release()
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json( {addFavourites:"added"} )
}

export default AddFavourites