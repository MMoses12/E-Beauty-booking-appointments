import express from "express";
import RefreshToken from "../controllers/tokenControllers/tokenController.js";
import checkToken from "../controllers/tokenControllers/checkToken.js";

const route = express.Router();

// Check if the user's token is valid.
route.get("/check-token", checkToken)

route.get("/refresh-token", RefreshToken)

export default route;