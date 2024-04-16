// Imports.
import pool from "../../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Remove a specific store from a user's favourites. 
async function RemoveFavourite (req, res) {
    // Check if the token is valid.
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

    // Remove the store from the user's favourites.
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const username = decoded.username

        const store = req.query.storeID

        const sql = await pool.connect()
    
        await sql.query('DELETE FROM FAVOURITE WHERE username = $1 AND store = $2', [username, store]);
        sql.release()
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json( {removeFavourite: "deleted"} )
}

export default RemoveFavourite