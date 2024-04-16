import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Check if user's token is valid.
function CheckToken (req, res) {
    let accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(401).json({ error: "No token" })
    }

    accessToken = accessToken.split(' ')[1]

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        return res.status(401).json({ error: "Token expired" })
    }

    return res.status(200).json( { status: "Okay" } )
}

export default CheckToken