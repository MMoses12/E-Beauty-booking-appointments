import pool from "../../../config/db.js";
import fs from "fs/promises";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function getUsernamePhoto(req, res) {
    let sql = await pool.connect();

    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        token = token.split(' ')[1];

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const username = decode.username;

        let dbUser = await sql.query("SELECT userphoto FROM user_data WHERE username = $1", [username]);
        const logophotoPath = dbUser.rows[0].userphoto;
        if (logophotoPath && logophotoPath.trim() !== "") {
            // Check if the file exists
            try {
                await fs.access(logophotoPath);
                // File exists, read it
                const image = await fs.readFile(logophotoPath);
                const imageBase64 = Buffer.from(image).toString('base64');
                return res.status(200).json({ username: username, photo: "data:image/png;base64," + imageBase64 });
            } catch (err) {
                // File does not exist
                return res.status(200).json({ username: username });
            }
        } else {
            return res.status(200).json({ username: username })
        }
    } catch (error) {
        console.error("Error executing query or connecting to the database:", error.message);
        return res.status(500).json({ error: "An error occurred" });
    } finally {
        sql.release();
    }
}

export default getUsernamePhoto;
