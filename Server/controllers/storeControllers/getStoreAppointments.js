import pool from "../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Get a specific store's appointments.
async function getStoreAppointments (req, res) {
    // Check if user's token is valid.
    let token = req.headers.authorization
    let appointments, storeID = req.body.storeID
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
        const currentDate = new Date();
        const today = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        
        // Execute the query
        appointments = await sql.query('SELECT s.storename, fullname, hour, closed_at, ser.name\
                                        FROM appointment a, store s, service ser\
                                        WHERE s.id = $1 AND (closed_at > $2 OR closed_at = $2) AND s.id = a.store AND a.service = ser.id', [storeID, today]);
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        res.status(402).json({"getUserValidAppointments":"error"});
        return;
    } finally {
        // Release the client back to the pool
        sql.release();
    }

    for (var i = 0; i < appointments.rows.length; i ++) {
        appointments.rows[i]["closed_at"] = `${appointments.rows[i]["closed_at"].getFullYear()}-${(appointments.rows[i]["closed_at"].getMonth() + 1).toString().padStart(2, '0')}-${appointments.rows[i]["closed_at"].getDate().toString().padStart(2, '0')}`;
        
        const lastIndex = appointments.rows[i]["hour"].lastIndexOf(':')
        appointments.rows[i]["hour"] = appointments.rows[i]["hour"].substring(0, lastIndex)
    }

    res.json({ appointments: appointments.rows });
}

export default getStoreAppointments;