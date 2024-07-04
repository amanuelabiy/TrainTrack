import { RequestHandler } from "express";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import createHttpError from "http-errors";

interface ExerciseBody extends IExercise {}

export const createExercise: RequestHandler<
  unknown,
  unknown,
  ExerciseBody,
  unknown
> = async (req, res, next) => {
  const workoutName = req.body.workoutName;
  const name = req.body.name;
  const sets = req.body.sets;
  const reps = req.body.reps;
  const weight = req.body.weight;
  const notes = req.body.notes;

  try {
    if (!workoutName || !name || !sets || !reps) {
      throw createHttpError(400, "Missing or Invalid Exercise Fields");
    }

    const newExercise = await ExerciseModel.create({
      workoutName: workoutName,
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
      notes: notes,
    });

    res.status(201).json(newExercise);
  } catch (error) {
    next(error);
  }
};
