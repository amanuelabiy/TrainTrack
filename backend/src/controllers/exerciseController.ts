import { RequestHandler } from "express";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { createExercise } from "../services/exerciseService";

interface ExerciseBody extends IExercise {}

export const createExerciseHandler: RequestHandler<
  unknown,
  unknown,
  ExerciseBody,
  unknown
> = async (req, res, next) => {
  try {
    const exerciseData = req.body;
    const newExercise = await createExercise(exerciseData);

    res.status(201).json(newExercise);
  } catch (error) {
    next(error);
  }
};

export const getExercises: RequestHandler = async (req, res, next) => {
  try {
    const exercises = await ExerciseModel.find().exec();
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
};

export const getExercise: RequestHandler = async (req, res, next) => {
  const exerciseId = req.params.exerciseId;

  try {
    if (!mongoose.isValidObjectId(exerciseId)) {
      throw createHttpError(400, "Invalid exercise id");
    }

    const exercise = await ExerciseModel.findById(exerciseId).exec();

    if (!exercise) {
      throw createHttpError(404, "Exercise Not Found");
    }

    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
};
