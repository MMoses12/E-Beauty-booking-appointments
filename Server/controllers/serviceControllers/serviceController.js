import pool from "../../config/db.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Get all the services of the store.
async function getServices (req, res) {
    // Check user's token.
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

    // Get data from request body.
    let services
    let storeID = req.body.storeID

    const sql = await pool.connect()
    
    try {
        // Execute the query
        services = await sql.query('SELECT name, id FROM service WHERE store = $1 ORDER BY id', [storeID]);
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        res.json({"getServices":"error"});
        return;
    } finally {
        // Release the client back to the pool
        sql.release();
    }

    res.json({"getServices":services.rows});
}

export default getServices;