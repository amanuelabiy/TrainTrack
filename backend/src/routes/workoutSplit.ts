import express from "express";
import * as WorkoutSplitController from "../controllers/workoutSplitController";

const router = express.Router();

router.post("/", WorkoutSplitController.createWorkoutSplit);

router.patch("/:workoutSplitId", WorkoutSplitController.updateWorkoutSplit);

export default router;
