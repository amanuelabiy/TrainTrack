import { RequestHandler } from "express";
import WorkoutModel from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface WorkoutBody {
  workoutName?: string;
  exercises?: IExercise[];
  notes?: string;
}

export const createWorkout: RequestHandler<
  unknown,
  unknown,
  WorkoutBody,
  unknown
> = async (req, res, next) => {
  try {
    const workoutName = req.body.workoutName;
    const exercises = req.body.exercises;
    const notes = req.body.notes;

    if (!workoutName || !exercises || !Array.isArray(exercises)) {
      throw createHttpError(400, "Missing or Invalid Workout Fields");
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

    console.log(exerciseDocs);

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

export const getWorkout: RequestHandler = async (req, res, next) => {
  const workoutId = req.params.workoutId;
  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid workout id");
    }

    const workout = await WorkoutModel.findById(workoutId).exec();

    if (!workout) {
      throw createHttpError(404, "Workout Not Found");
    }

    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
};
