import mongoose from "mongoose";
import env from "./validateEnv";

const MONGO_URL = env.MONGO_CONNECTION_STRING as string;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL!);
    console.log("Mongoose Connected");
  } catch (error) {
    console.log("MongoDB connection error");
  }
};

export default connectDB;
