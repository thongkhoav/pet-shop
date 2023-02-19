import dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connectToDb = async () => {
  try {
    // console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
}

export default connectToDb;
