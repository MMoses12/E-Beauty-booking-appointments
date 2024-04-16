// Imports.
import pool from "../../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Login user.
async function LoginStore (req, res) {
    let dbUser

    // Get username and password from request body.
    const username = req.body.username
    const password = req.body.password

    const sql = await pool.connect()

    // Get the user from database.
    try {
        // Execute the query
        dbUser = await sql.query('SELECT username, password, hasStore FROM user_data WHERE username LIKE $1', [username])
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return
    } finally {
        // Release the client back to the pool
        sql.release()
    }

    // Check the return user if exists.
    if (dbUser.rows.length === 0 || dbUser.rows[0].hasstore === false) {
        res.sendStatus(404) // Not Found
        return;
    }

    // Compare the encrypted password with the given one.
    let result
    result = await bcrypt.compare(password, dbUser.rows[0]["password"])
    if (result == false) {
        res.sendStatus(401) // Unauthorized
        return;
    }
    
    // Make new access and refresh token for the user.
    const payload = {
        username: username
    };

    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    let refreshtoken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    res.status(200).json({ token: token, refreshtoken: refreshtoken }) // Send JSON response with status 200
}

export default LoginStore