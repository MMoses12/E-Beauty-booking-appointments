import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import pool from "../../../config/db.js";
import fs from "fs/promises";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from 'path';

dotenv.config();

async function changePhoto(req, res) {
    let sql = await pool.connect();

    try {
        let photo = req.body.photo;

        // Extract base64 data
        const base64Data = photo.replace(/^data:image\/\w+;base64,/, '');
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        token = token.split(' ')[1];

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const username = decode.username;

        const storeImage = Buffer.from(base64Data, 'base64');

        const __dirname = dirname(fileURLToPath(import.meta.url));
        const pathName = path.join(__dirname, '../../../Photos/', username + '.png');
        try {
            await fs.writeFile(pathName, storeImage);
        } catch (error) {
            console.error("Error saving image:", error.message);
            return res.status(500).json({ error: "Error saving image" });
        }

        await sql.query("UPDATE user_data SET userphoto = $1 WHERE username = $2", [pathName, username]);

        return res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        console.error("Error executing query or connecting to the database:", error.message);
        return res.status(500).json({ error: "An error occurred" });
    } finally {
        sql.release();
    }
}

export default changePhoto;
