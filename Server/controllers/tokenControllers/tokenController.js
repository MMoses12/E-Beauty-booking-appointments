// Imports
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

// Refresh user's access token.
async function RefreshToken (req, res) {
    // Get user's refresh token and check if it is valid.
    let refreshToken = req.headers.authorization

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token not provided" })
    }
    
    refreshToken = refreshToken.split(" ")[1];
    
    // Create new access token.
    try {
        let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        delete payload.exp

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

        return res.status(200).json({ accessToken: accessToken })
    } catch (err) {
        console.error("Error verifying refresh token: ", err.message);
        return res.status(401).json({ error: "Invalid refresh token" })
    }
}

export default RefreshToken