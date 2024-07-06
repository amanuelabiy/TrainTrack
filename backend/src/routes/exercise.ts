import express from "express";
import * as ExerciseController from "../controllers/exerciseController";

const router = express.Router();

router.post("/", ExerciseController.createExerciseHandler);

router.get("/", ExerciseController.getExercises);

router.get("/:exerciseId", ExerciseController.getExercise);

export default router;
