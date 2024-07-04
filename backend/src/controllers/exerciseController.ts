import { RequestHandler } from "express";
import ExerciseModel from "../models/Exercise";

export const createExercise: RequestHandler = async (req, res, next) => {
  const workoutName = req.body.workoutName;
  const name = req.body.name;
  const sets = req.body.sets;
  const reps = req.body.reps;
  const weight = req.body.weight;
  const notes = req.body.notes;

  try {
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
