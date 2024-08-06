import express from "express";
import * as ExerciseController from "../controllers/exerciseController";
import authMiddleWare from "../middleware/authMiddleWare";

const router = express.Router();

router.use(authMiddleWare);

router.post("/", ExerciseController.createExerciseHandler);

router.get("/", ExerciseController.getExercises);

router.get("/:exerciseId", ExerciseController.getExercise);

export default router;
