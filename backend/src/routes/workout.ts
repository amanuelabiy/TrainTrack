import express from "express";
import * as WorkoutController from "../controllers/workoutController";

const router = express.Router();

router.post("/", WorkoutController.createWorkout);

export default router;
