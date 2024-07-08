import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import WorkoutModel from "../models/Workout";
import Workout, { IWorkout } from "../models/Workout";
import { updateExercise, createExercise } from "./exerciseService";
import ExerciseModel, { IExercise } from "models/Exercise";
import { deleteExercise } from "./exerciseService";

interface WorkoutData {
  workoutName: string;
  exercises: IExercise[];
  notes?: string;
}

export const createWorkout = async (workoutData: WorkoutData) => {
  const { workoutName, exercises, notes } = workoutData;

  try {
    const exerciseDocs = await Promise.all(
      exercises.map(async (exercise: any) => {
        const newExercise = await createExercise(exercise);
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

    const populatedWorkout = await WorkoutModel.findById(newWorkout._id)
      .populate("exercises")
      .exec();

    return populatedWorkout;
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }

    throw createHttpError(
      500,
      "An unexpected workout service error has occured"
    );
  }
};

export const getWorkout = async (workoutId: Types.ObjectId) => {
  const workout = await WorkoutModel.findById(workoutId)
    .populate("exercises")
    .exec();

  if (!workout) {
    throw createHttpError(404, "Workout Not Found");
  }

  return workout;
};

export const getWorkouts = async () => {
  const workouts = await WorkoutModel.find().populate("exercises").exec();

  return workouts;
};

interface UpdateWorkoutData {
  workoutId: Types.ObjectId;
  newWorkoutName?: string;
  newExercises?: Partial<IExercise>[];
  newNotes?: string;
}

export const updateWorkout = async (updateData: UpdateWorkoutData) => {
  const { workoutId, newWorkoutName, newExercises, newNotes } = updateData;

  const workout = await WorkoutModel.findById(workoutId).exec();

  if (!workout) {
    throw createHttpError(404, "Workout Not Found");
  }

  if (newWorkoutName) {
    workout.workoutName = newWorkoutName;
  }

  if (newNotes) {
    workout.notes = newNotes;
  }

  if (newExercises && Array.isArray(newExercises)) {
    const updatedExerciseIds = await Promise.all(
      newExercises.map(async (exercise) => {
        if (exercise._id) {
          const updatedExercise = await updateExercise(
            exercise._id as Types.ObjectId,
            exercise
          );
          if (updatedExercise) {
            return updatedExercise._id;
          }
        } else {
          const newExercise = await createExercise(exercise as IExercise);

          return newExercise._id;
        }
        return null;
      })
    );
    workout.exercises = updatedExerciseIds.filter(
      (id) => id !== null && id !== undefined
    ) as Types.ObjectId[];
  }

  await workout.save();

  const populatedWorkout = await WorkoutModel.findById(workoutId)
    .populate("exercises")
    .exec();

  return populatedWorkout;
};

export const deleteWorkout = async (workoutId: Types.ObjectId) => {
  const workout = await WorkoutModel.findById(workoutId)
    .populate("exercises")
    .exec();

  if (!workout) {
    throw createHttpError(404, "Workout Not Found");
  }

  if (workout.exercises && workout.exercises.length > 0) {
    await Promise.all(
      workout.exercises.map(async (exerciseId) => {
        await deleteExercise(exerciseId);
      })
    );
  }

  const deletedWorkout = await WorkoutModel.findByIdAndDelete(workoutId);

  return deletedWorkout;
};
