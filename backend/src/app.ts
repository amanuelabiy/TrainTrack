import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import exerciseRoutes from "./routes/exercise";
import workoutRoutes from "./routes/workout";
import errorHandler from "./middleware/errorHandler";
import morgan from "morgan";
import createHttpError from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/exercises", exerciseRoutes);

app.use("/api/workouts", workoutRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use(errorHandler);

export default app;
