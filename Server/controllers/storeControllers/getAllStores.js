// Imports.
import pool from "../../config/db.js"
import fs from "fs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Get all the stores from the database.
async function GetAllStores(req, res) {
    let stores, username, groupBy = req.query.groupBy

    // Check if user's token is valid.
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access" })
    }

    token = token.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        username = decode.username
    } catch (error) {
        console.error("Error:", error.message)
        return res.status(401).json({ error: "Unauthorized access" })
    }

    const sql = await pool.connect()

    try {
        stores = await sql.query('SELECT id, storename, type, logophoto, avg_rating, city FROM store ORDER BY id')

        await Promise.all(stores.rows.map(async (store, index) => {
            try {
                let lowestPriceResult = await sql.query('SELECT min(price) FROM service WHERE store = $1', [store.id])
                let lowestPrice = lowestPriceResult.rows[0].min

                let favouriteResult = await sql.query('SELECT * FROM favourite WHERE store = $1 AND username = $2', [store.id, username])
                let isFavourite = favouriteResult.rows.length === 1

                stores.rows[index] = {
                    ...store,
                    isFavourite: isFavourite,
                    lowestPrice: lowestPrice
                }

                const logophotoPath = store.logophoto
                if (logophotoPath && logophotoPath.trim() !== "") {
                    const image = fs.readFileSync(logophotoPath)
                    const imageBase64 = Buffer.from(image).toString('base64')
                    stores.rows[index].logophoto = "data:image/png;base64," + imageBase64
                }
            } catch (error) {
                console.error("Error executing query or connecting to the database: ", error.message)
                // Log the error and continue with other items
            }
        }))
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message)
        return res.status(500).json({ "getStores": "error" })
    } finally {
        sql.release()
    }

    return res.status(200).json({ "getStores": stores.rows })
}

export default GetAllStores