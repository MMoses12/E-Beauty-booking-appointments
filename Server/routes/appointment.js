import express from "express"
// import closeAppointment, { dayAppointments, getAppointments, getOpenHours } from "../controllers/appointmentControllers/appointmentController.js"
import getAvailableAppointments from "../controllers/appointmentControllers/getAvailableAppointments.js"
import closeAppointment from "../controllers/appointmentControllers/closeAppointment.js"

const route = express.Router();

// Route to close an appointment for a user.
route.put("/close-appointment", closeAppointment)

// Route to get all the appointments of a store.
route.post("/get-appointments", getAvailableAppointments)

// Route to count all the appointments closed a specific date.
// route.post("/day-appointments", dayAppointments);

// Route to get the open hours of the store.
// route.post("/get-hours", getOpenHours);

export default route;