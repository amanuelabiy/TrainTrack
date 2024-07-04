import express from "express";
import * as ExerciseController from "../controllers/exerciseController";

const router = express.Router();

router.post("/", ExerciseController.createExercise);

export default router;
