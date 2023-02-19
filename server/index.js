import express from "express";
import dotenv from "dotenv";
import logger from 'morgan'
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
// import usersRoute from "./routes/users.js";
import petRouter from "./routes/petRouter.js";
import speciesRouter from "./routes/speciesRouter.js";
import cartRouter from "./routes/cartRouter.js";
// import roomsRoute from "./routes/rooms.js";
import imageRouter from './routes/imageRouter.js'

import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from 'body-parser'
import connectToDb from "./config/dbConnection.js";

const app = express();
dotenv.config();


connectToDb();

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
app.use("/api/pets", petRouter);
app.use("/api/species", speciesRouter);
app.use("/api/cart", cartRouter);
// app.use("/api/rooms", roomsRoute);
app.use('/image', imageRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // connect();
  console.log("Connected to backend at port ",port);
});
