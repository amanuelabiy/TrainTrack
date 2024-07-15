import { RequestHandler } from "express";
import WorkoutModel from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import { createExercise, updateExercise } from "../services/exerciseService";
import * as workoutService from "../services/workoutService";
import { Day } from "../types/types";

interface WorkoutBody {
  workoutName?: string;
  exercises?: IExercise[];
  day?: Day;
  notes?: string;
}

export const createWorkout: RequestHandler<
  unknown,
  unknown,
  WorkoutBody,
  unknown
> = async (req, res, next) => {
  const { workoutName, exercises, day, notes } = req.body;

  try {
    if (!workoutName || !exercises || !day || !Array.isArray(exercises)) {
      throw createHttpError(400, "Missing or Invalid Workout Fields");
    }

    const newWorkout = await workoutService.createWorkout({
      workoutName,
      exercises,
      day,
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
  _id?: string;
  workoutName?: string;
  exercises?: Partial<IExercise>[];
  day?: Day;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isEditing?: boolean;
}

export const updateWorkout: RequestHandler<
  UpdateWorkoutParams,
  unknown,
  UpdateWorkoutBody,
  unknown
> = async (req, res, next) => {
  const workoutId = req.params.workoutId;

  const newWorkoutName = req.body.workoutName;
  const newDay = req.body.day;
  const newExercises = req.body.exercises;
  const newNotes = req.body.notes;

  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid Workout Id");
    }

    const updateData: Partial<UpdateWorkoutBody> = {};
    if (newWorkoutName !== undefined) updateData.workoutName = newWorkoutName;
    if (newExercises !== undefined) updateData.exercises = newExercises;
    if (newDay !== undefined) updateData.day = newDay;
    if (newNotes !== undefined) updateData.notes = newNotes;

    // if (!newWorkoutName && !newExercises && !newNotes && !newDay) {
    //   throw createHttpError(400, "No valid fields to update");
    // }

    if (Object.keys(updateData).length === 0) {
      throw createHttpError(400, "No valid feilds to update");
    }

    // const newUpdateData = {
    //   workoutId: new mongoose.Types.ObjectId(workoutId),
    //   newWorkoutName: newWorkoutName,
    //   newExercises: newExercises,
    //   newDay: newDay,
    //   newNotes: newNotes,
    // };

    const updatedWorkout = await workoutService.updateWorkout(
      new mongoose.Types.ObjectId(workoutId),
      updateData
    );

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
