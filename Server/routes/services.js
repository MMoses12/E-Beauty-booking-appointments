import express from "express"
import getServices from "../controllers/serviceControllers/serviceController.js"

const route = express.Router();

// Route to get all the services from a store.
route.post("/get-services", getServices);

export default route;