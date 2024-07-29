import createHttpError from "http-errors";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import mongoose, { Types } from "mongoose";

export const createExercise = async (exerciseData: IExercise) => {
  const workoutName = exerciseData.workoutName;
  const name = exerciseData.name;
  const sets = exerciseData.sets;
  const reps = exerciseData.reps;
  const workingSets = exerciseData.workingSets;
  const notes = exerciseData.notes;
  const completed = exerciseData.completed;

  try {
    if (!workoutName || !name || !sets || !reps) {
      throw createHttpError(400, "Missing or Invalid Exercise Fields");
    }

    if (workingSets) {
      for (const workingSet of workingSets) {
        if (!workingSet.weight || !workingSet.reps || !workingSet.completed) {
          throw createHttpError(
            400,
            "Missing or Invalid Working Set Exercise Fields"
          );
        }
      }
    }

    const newExercise = await ExerciseModel.create({
      workoutName: workoutName,
      name: name,
      sets: sets,
      reps: reps,
      workingSets: workingSets,
      notes: notes,
      completed: completed,
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

export const getExercise = async (exerciseId: Types.ObjectId) => {
  const exercise = await ExerciseModel.findById(exerciseId).exec();

  if (!exercise) {
    throw createHttpError(404, "Exercise Not Found");
  }

  return exercise;
};

export const getExercises = async () => {
  const exercises = await ExerciseModel.find().exec();

  return exercises;
};

export const updateExercise = async (
  exerciseId: Types.ObjectId,
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

export const deleteExercise = async (exerciseId: Types.ObjectId) => {
  if (!mongoose.isValidObjectId(exerciseId)) {
    throw createHttpError(400, "Invalid Exercise Id");
  }

  const deletedExercise = await ExerciseModel.findByIdAndDelete(exerciseId);

  if (!deletedExercise) {
    throw createHttpError(404, "Exercise not found");
  }

  return deletedExercise;
};
