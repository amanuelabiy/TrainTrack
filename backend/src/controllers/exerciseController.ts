import { RequestHandler } from "express";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import * as exerciseService from "../services/exerciseService";

interface ExerciseBody extends IExercise {}

export const createExerciseHandler: RequestHandler<
  unknown,
  unknown,
  ExerciseBody,
  unknown
> = async (req, res, next) => {
  try {
    const exerciseData = req.body;
    const newExercise = await exerciseService.createExercise(exerciseData);

    res.status(201).json(newExercise);
  } catch (error) {
    next(error);
  }
};

export const getExercises: RequestHandler = async (req, res, next) => {
  try {
    const exercises = await exerciseService.getExercises();
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
};

export const getExercise: RequestHandler<{ exerciseId: string }> = async (
  req,
  res,
  next
) => {
  const { exerciseId } = req.params;

  try {
    if (!mongoose.isValidObjectId(exerciseId)) {
      throw createHttpError(400, "Invalid exercise id");
    }

    const exercise = await exerciseService.getExercise(
      new mongoose.Types.ObjectId(exerciseId)
    );

    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
};

// interface UpdateExerciseParams {
//   exerciseId: string;
// }

// interface UpdateExerciseBody {
//   workoutName?: string;
//   name?: string;
//   sets?: string;
//   reps?: string;
//   weight?: string;
//   note?: string;
// }

// export const updateExercise: RequestHandler<
//   UpdateExerciseParams,
//   unknown,
//   UpdateExerciseBody,
//   unknown
// > = async (req, res, next) => {
//   const exerciseId = req.params.exerciseId;

//   const { workoutName, name, sets, reps, weight, note } = req.body;

//   try {
//     if (!mongoose.isValidObjectId(exerciseId)) {
//       throw createHttpError(400, "Invalid Exercise Id");
//     }

//     if ()
//   } catch (error) {
//     next(error);
//   }
// };
