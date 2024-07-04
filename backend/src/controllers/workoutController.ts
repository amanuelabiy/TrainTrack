import { RequestHandler } from "express";
import WorkoutModel from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { ValidationError } from "middleware/errors";

export const createWorkout: RequestHandler = async (req, res, next) => {
  try {
    const workoutName = req.body.workoutName;
    const exercises = req.body.exercises;
    const notes = req.body.notes;

    if (!workoutName || !exercises || !Array.isArray(exercises)) {
      throw new ValidationError("Missing or invalid required fields");
    }
  } catch (error) {
    next(error);
  }
};
