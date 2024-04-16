import pool from "../../config/db.js"
import fs from "fs/promises"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import path from 'path';

dotenv.config()

// Get a specific store info searching by id.
async function GetStoreInfo(req, res) {
    let sql   
    try {
        // Check if user's token is valid.
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
        
        let storeID = req.body.storeID
        let storeInfo, services

        sql = await pool.connect()
  
        // Get the store photos from the path and make them
        // into base 64 string.
        storeInfo = await sql.query('SELECT * FROM store WHERE id = $1', [storeID])
        services = await sql.query('SELECT service.name FROM store, service WHERE service.store = store.id AND store.id = $1', [storeID])
        
        const __dirname = dirname(fileURLToPath(import.meta.url))

        await Promise.all(storeInfo.rows.map(async (store, index) => {    
            // Check if logophotoPath is not empty
            let logophotoPath
            if (store.logophoto)    
                logophotoPath = path.join(__dirname, store.logophoto)
            if (logophotoPath && logophotoPath.trim() !== "") {
                const image = await fs.readFile(logophotoPath);
                const imageBase64 = Buffer.from(image).toString('base64');
                storeInfo.rows[index].logophoto = "data:image/png;base64," + imageBase64;
            }

            let backgroundPath
            if (store.backgroundphoto)    
                backgroundPath = path.join(__dirname, store.backgroundphoto)
            if (backgroundPath && backgroundPath.trim() !== "") {
                const image = await fs.readFile(backgroundPath);
                const imageBase64 = Buffer.from(image).toString('base64');
                storeInfo.rows[index].backgroundphoto = "data:image/png;base64," + imageBase64;
            }
        }))

        services = services.rows
    
        return res.status(200).json({ "storeInfo": storeInfo.rows, "services": services })
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500).json({"storeInfo":"error"})
    } finally {
        if (sql) sql.release()
    }
}

export default GetStoreInfo
