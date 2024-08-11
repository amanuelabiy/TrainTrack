import express from "express";
import * as WorkoutHistoryController from "../controllers/workoutHistoryController";
import authMiddleWare from "../middleware/authMiddleWare";

const router = express.Router();

router.use(authMiddleWare);

router.patch("/", WorkoutHistoryController.addWorkoutToHistory);

router.get("/", WorkoutHistoryController.getWorkoutHistory);

router.patch(
  "/delete-latest/:workoutId",
  WorkoutHistoryController.deleteLatestWorkoutFromHistory
);

router.get(
  "/second-latest/:workoutId",
  WorkoutHistoryController.getSecondLatestWorkoutFromHistory
);

export default router;
