import express from "express";
import * as WorkoutController from "../controllers/workoutController";
import authMiddleWare from "../middleware/authMiddleWare";

const router = express.Router();

router.use(authMiddleWare);

router.post("/", WorkoutController.createWorkout);

router.get("/", WorkoutController.getWorkouts);

router.get("/:workoutId", WorkoutController.getWorkout);

router.get("/day/:day", WorkoutController.getWorkoutsForDay);

router.patch("/:workoutId", WorkoutController.updateWorkout);

router.delete("/:workoutId", WorkoutController.deleteWorkout);

export default router;
