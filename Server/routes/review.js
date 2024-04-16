import express from "express";
import submitRating from "../controllers/ratingControllers/submitRating.js";
import getAllReviews from "../controllers/ratingControllers/getReviewsController.js"

const route = express.Router();

// Route to submit user's review.
route.put("/submit-rating", submitRating);

// Route to get all the reviews for a specific store.
route.post("/get-reviews", getAllReviews);

export default route;