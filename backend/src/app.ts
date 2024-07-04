import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import exerciseRoutes from "./routes/exercise";
import workoutRoutes from "./routes/workout";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/exercises", exerciseRoutes);

app.use("/api/workouts", workoutRoutes);

app.use(errorHandler);

export default app;
