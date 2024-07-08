import { RequestHandler } from "express";
import WorkoutModel from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import { createExercise, updateExercise } from "../services/exerciseService";
import * as workoutService from "../services/workoutService";

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
  const { workoutName, exercises, notes } = req.body;

  try {
    if (!workoutName || !exercises || !Array.isArray(exercises)) {
      throw createHttpError(400, "Missing or Invalid Workout Fields");
    }

    const newWorkout = await workoutService.createWorkout({
      workoutName,
      exercises,
      notes,
    });
    res.status(201).json(newWorkout);
  } catch (error) {
    next(error);
  }
};

export const getWorkouts: RequestHandler = async (req, res, next) => {
  try {
    const workouts = await workoutService.getWorkouts();
    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
};

export const getWorkout: RequestHandler<{ workoutId: string }> = async (
  req,
  res,
  next
) => {
  const { workoutId } = req.params;

  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid Workout Id");
    }

    const workout = await workoutService.getWorkout(
      new mongoose.Types.ObjectId(workoutId)
    );

    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
};

interface UpdateWorkoutParams {
  workoutId: string;
}

interface UpdateWorkoutBody {
  workoutName?: string;
  exercises?: Partial<IExercise>[];
  notes?: string;
}

export const updateWorkout: RequestHandler<
  UpdateWorkoutParams,
  unknown,
  UpdateWorkoutBody,
  unknown
> = async (req, res, next) => {
  const workoutId = req.params.workoutId;

  const newWorkoutName = req.body.workoutName;
  const newExercises = req.body.exercises;
  const newNotes = req.body.notes;

  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid Workout Id");
    }

    if (!newWorkoutName && !newExercises && !newNotes) {
      throw createHttpError(400, "No valid fields to update");
    }

    const newUpdateData = {
      workoutId: new mongoose.Types.ObjectId(workoutId),
      newWorkoutName: newWorkoutName,
      newExercises: newExercises,
      newNotes: newNotes,
    };

    const updatedWorkout = await workoutService.updateWorkout(newUpdateData);

    res.status(200).json(updatedWorkout);
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout: RequestHandler<{ workoutId: string }> = async (
  req,
  res,
  next
) => {
  const { workoutId } = req.params;

  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid Workout id");
    }

    const deletedWorkout = await workoutService.deleteWorkout(
      new mongoose.Types.ObjectId(workoutId)
    );

    res.status(200).json(deletedWorkout);
  } catch (error) {
    next(error);
  }
};
