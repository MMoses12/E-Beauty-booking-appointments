import pool from "../../config/db.js";
import fs from "fs/promises";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 

dotenv.config();

async function FilterStores (req, res) {
    let sql = await pool.connect()

    try {
        let { types, services, cities, storeName, groupBy } = req.body
        // Check user's token.
        let token = req.headers.authorization

        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        token = token.split(' ')[1];

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Get the username from the token.
        const username = decode.username;

        storeName = storeName.toLowerCase();

        // Filter stores depending on search, services, types and cities.
        let query = 'SELECT id, storename, type, logophoto, avg_rating, city, backgroundphoto FROM store WHERE LOWER(storename) LIKE $1';
        const queryParams = [`${storeName}%`];

        if (services) {
            const serviceQuery = 'SELECT store FROM service INNER JOIN store ON service.store = store.id WHERE service.name LIKE ANY($1)';
            const serviceResults = await sql.query(serviceQuery, [services]);

            if (serviceResults.rowCount === 0) {
                return res.json({ "filterStores": [] });
            }

            const storeIDs = serviceResults.rows.map(obj => obj.store);
            query += ' AND id = ANY($2)';
            queryParams.push(storeIDs);
        }

        if (types) {
            query += ' AND type LIKE ANY($' + (queryParams.length + 1) + ')';
            queryParams.push(types);
        }

        if (cities) {
            query += ' AND city LIKE ANY($' + (queryParams.length + 1) + ')';
            queryParams.push(cities);
        }

        let orderBy = '';

        if (groupBy === 'Newest first') {
            orderBy = 'store.id DESC';
        } else if (groupBy === 'By popularity') {
            orderBy = 'store.id ASC';
        }

        if (orderBy) {
            query += ' ORDER BY ' + orderBy;
        }

        // Take the photo from the path and
        // make it into base 64 string,
        const storeInfo = await sql.query(query, queryParams);
        const __dirname = dirname(fileURLToPath(import.meta.url))

        await Promise.all(storeInfo.rows.map(async (store, index) => {
            try {
                let lowestPriceResult = await sql.query('SELECT min(price) FROM service WHERE store = $1', [store.id])
                let lowestPrice = lowestPriceResult.rows[0].min

                let favouriteResult = await sql.query('SELECT * FROM favourite WHERE store = $1 AND username = $2', [store.id, username])
                let isFavourite = favouriteResult.rows.length === 1

                storeInfo.rows[index] = {
                    ...store,
                    isFavourite: isFavourite,
                    lowestPrice: lowestPrice
                }

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
            } catch (error) {
                console.error("Error executing query or connecting to the database: ", error.message);
                // Log the error and continue with other items
            }
        }));
        
        return res.status(200).json({ "filterStores": storeInfo.rows });
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500).json({ "filterStores": "error" })
    } finally {
        sql.release()
    }
}

export default FilterStores