import pool from "../../config/db.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Close an appointment for a user.
async function closeAppointment (req, res) {
    // Check user's token.
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access" })
    }

    token = token.split(' ')[1]

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized access" })
    }

    // Get the appointment's data.
	let date = req.body.date
	let hour = req.body.hour
    let service = req.body.service
    let storeID = req.body.storeID
    let fullName = req.body.fullName
    let phone = req.body.phone
	
	const sql = await pool.connect()
    
    // Get selected service's ID and
    // insert the appointment into the database.
    try {
        let serviceID = await sql.query("SELECT service.id FROM service, store WHERE service.store = store.id AND service.name = $1 AND store.id = $2", 
            [service, storeID]
        )

        serviceID = serviceID.rows[0].id

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let username = decoded.username
        
        // Execute the query
        await sql.query('INSERT INTO appointment (fullName, username, phone, hour, closed_at, store, service)\
        VALUES ($1, $2, $3, $4, $5, $6, $7)',[fullName, username, phone, hour, date, storeID, serviceID])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        res.status(500).json({ "closeAppointment":"error" })
        return;
    } finally {
        // Release the client back to the pool
        sql.release()
    }

    res.status(200).json({ "closeAppointment":"true" })
}

export default closeAppointment