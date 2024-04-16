import pool from "../../config/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from 'path';
import fs from 'fs/promises'; // Import fs with promises
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

async function getUserFavourites(req, res) {
    let token = req.headers.authorization;
    let storeInfo, storeIDs, username;
    let sql = await pool.connect();

    if (!token) {
        res.status(401).json({ error: "Unauthorized access" });
        return;
    }

    token = token.split(' ')[1];

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        res.status(401).json({ error: "Unauthorized access" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        username = decoded.username;

        storeIDs = await sql.query("SELECT store FROM FAVOURITE WHERE username LIKE $1", [username]);
        storeIDs = storeIDs.rows.map(obj => obj.store);

        storeInfo = await sql.query("SELECT id, storename, type, logophoto, avg_rating, city, backgroundphoto FROM store WHERE id = ANY($1)", [storeIDs]);
        const __dirname = dirname(fileURLToPath(import.meta.url));

        await Promise.all(storeInfo.rows.map(async (store, index) => {
            try {
                let lowestPriceResult = await sql.query('SELECT min(price) FROM service WHERE store = $1', [store.id]);
                let lowestPrice = lowestPriceResult.rows[0].min;

                let favouriteResult = await sql.query('SELECT * FROM favourite WHERE store = $1 AND username = $2', [store.id, username]);
                let isFavourite = favouriteResult.rows.length === 1;

                storeInfo.rows[index] = {
                    ...store,
                    isFavourite: isFavourite,
                    lowestPrice: lowestPrice
                };

                let logophotoPath;
                if (store.logophoto)
                    logophotoPath = path.join(__dirname, store.logophoto);
                console.log(logophotoPath);
                if (logophotoPath && logophotoPath.trim() !== "") {
                    const image = await fs.readFile(logophotoPath);
                    const imageBase64 = Buffer.from(image).toString('base64');
                    storeInfo.rows[index].logophoto = "data:image/png;base64," + imageBase64;
                }

                let backgroundPath;
                if (store.backgroundphoto)
                    backgroundPath = path.join(__dirname, store.backgroundphoto);
                if (backgroundPath && backgroundPath.trim() !== "") {
                    const image = await fs.readFile(backgroundPath);
                    const imageBase64 = Buffer.from(image).toString('base64');
                    storeInfo.rows[index].backgroundphoto = "data:image/png;base64," + imageBase64;
                }
            } catch (error) {
                console.error("Error executing query or connecting to the database: ", error.message);
                // Log the error and continue with other items
            }
        }));

        console.log(storeInfo.rows);
        return res.status(200).json({ favourites: storeInfo.rows });
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        res.status(402).json({ error: "error" });
        return;
    } finally {
        // Release the client back to the pool
        sql.release();
    }
}

export default getUserFavourites;
