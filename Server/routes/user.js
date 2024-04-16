import express from "express";

// OTP controllers.
import sendPassword, { checkPassword } from "../controllers/userControllers/otpController.js"

// User exprience controllers.
import getUserValidAppointments from "../controllers/userControllers/getUserAppointments.js"
import getUserReviews from "../controllers/userControllers/getUserReview.js"
import getUserFavourites from "../controllers/userControllers/getUserFavourites.js";
import getUserData from "../controllers/userControllers/getUserData.js";

// User account controllers.
import DeleteUser from "../controllers/userControllers/userAccount/deleteUser.js"
import Login from "../controllers/userControllers/userAccount/loginController.js"
import PasswordChange from "../controllers/userControllers/userAccount/passwordChange.js"
import Register from "../controllers/userControllers/userAccount/registerController.js"
import UsernameChange from "../controllers/userControllers/userAccount/usernameChange.js"
import EmailChange from "../controllers/userControllers/userAccount/emailChange.js"
import ChangeData from "../controllers/userControllers/userAccount/changeUserData.js";

// Favourites controllers..
import AddFavourites from "../controllers/userControllers/favourites/addFavourite.js"
import RemoveFavourite from "../controllers/userControllers/favourites/removeFavourite.js"
import getSumData from "../controllers/userControllers/getSumData.js";

import changePhoto from "../controllers/userControllers/userAccount/changePhoto.js";
import getUsernamePhoto from "../controllers/userControllers/userAccount/getUsernamePhoto.js";

const route = express.Router()

// User Account routes.
// Register route.
route.put("/register", Register)

// Login route.
route.post("/check-credentials", Login)

// Route to change the password of a user.
route.patch("/change-password", PasswordChange)

// Route to change user's username.
route.patch("/username-change", UsernameChange)

// Route to change user's email.
route.patch("/email-change", EmailChange)

// Route to delete the user from the database.
route.delete("/delete-user", DeleteUser)


// One time password routes.

// Route to send one time password on email.
route.put("/send-otp", sendPassword)

// Route to check if the one time password is correct
// to register.
route.post("/check-otp", checkPassword)


// User experience routes.
// Route to get the valid user appointments.
route.post("/get-valid-appointments", getUserValidAppointments)

// Route to get the user reviews.
route.post("/get-user-reviews", getUserReviews)

route.get("/get-user-favourites", getUserFavourites)

// Route to add a user's favourite store.
route.put("/add-favourites", AddFavourites)

// Route to remove a user's favourite store.
route.delete("/remove-favourites", RemoveFavourite)

// Route 
route.get("/get-user-data", getUserData)

route.patch("/change-data", ChangeData)

route.get("/get-sum-data", getSumData)

route.post("/change-photo", changePhoto)

route.get("/get-username-photo", getUsernamePhoto)

export default route