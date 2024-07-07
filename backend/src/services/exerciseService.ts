import createHttpError from "http-errors";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import mongoose from "mongoose";

export const createExercise = async (exerciseData: IExercise) => {
  const workoutName = exerciseData.workoutName;
  const name = exerciseData.name;
  const sets = exerciseData.sets;
  const reps = exerciseData.reps;
  const weight = exerciseData.weight;
  const notes = exerciseData.notes;

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

    await newExercise.save();
    return newExercise;
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw createHttpError(500, "An unexpected service error has occured");
  }
};

export const updateExercise = async (
  exerciseId: string,
  update: Partial<IExercise>
) => {
  if (!mongoose.isValidObjectId(exerciseId)) {
    throw createHttpError(400, "Invalid Exercise Id");
  }

  const updatedExercise = await ExerciseModel.findByIdAndUpdate(
    exerciseId,
    update,
    { new: true }
  );

  if (!updateExercise) {
    throw createHttpError(404, "Exercise not found");
  }

  return updatedExercise;
};
