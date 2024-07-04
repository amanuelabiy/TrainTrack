import { RequestHandler } from "express";
import WorkoutModel from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { ValidationError } from "../middleware/errors";

export const createWorkout: RequestHandler = async (req, res, next) => {
  try {
    const workoutName = req.body.workoutName;
    const exercises = req.body.exercises;
    const notes = req.body.notes;

    if (!workoutName || !exercises || !Array.isArray(exercises)) {
      throw new ValidationError("Missing or invalid required fields");
    }

    const exerciseDocs = await Promise.all(
      exercises.map(async (exercise: any) => {
        const newExercise = new ExerciseModel(exercise);
        await newExercise.save();
        return newExercise._id;
      })
    );

    const newWorkout = new WorkoutModel({
      workoutName,
      exercises: exerciseDocs,
      notes,
    });

    await newWorkout.save();

    res.status(201).json(newWorkout);
  } catch (error) {
    next(error);
  }
};

export const getWorkouts: RequestHandler = async (req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().exec();
    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
};
