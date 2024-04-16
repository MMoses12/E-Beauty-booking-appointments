import express from "express";
import user from "./routes/user.js";
import appointment from "./routes/appointment.js";
import service from "./routes/services.js";
import store from "./routes/store.js";
import review from "./routes/review.js";
import token from "./routes/token.js";

import bodyParser from "body-parser"

import cors from "cors"

const app = express();

// Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(express.urlencoded({ extended: true })); // Use this for parsing form data

app.use(cors());

// Routes.
app.use("/user", user);
app.use("/appointment", appointment);
app.use("/service", service);
app.use("/store", store);
app.use("/review", review);
app.use("/token", token)

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
	message: "Something went really wrong",
  });
});

// Being able to handle requests from client from the same
// device as the server.
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions));

// Increase payload size limit (e.g., 50MB)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Listen on pc port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));