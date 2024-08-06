import express from "express";
import * as WorkoutHistoryController from "../controllers/workoutHistoryController";
import authMiddleWare from "../middleware/authMiddleWare";

const router = express.Router();

router.use(authMiddleWare);

router.patch("/", WorkoutHistoryController.addWorkoutToHistory);

export default router;
