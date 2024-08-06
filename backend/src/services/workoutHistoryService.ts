import createHttpError from "http-errors";
import WorkoutHistoryModel from "../models/WorkoutHistory";
import { Types } from "mongoose";
import { WorkoutData } from "types/types";

interface WorkoutToAdd {
  userId: Types.ObjectId;
  workout: WorkoutData;
}

export const addWorkoutToHistory = async (workoutToAdd: WorkoutToAdd) => {
  const { userId, workout } = workoutToAdd;

  const isWorkoutCompleted = workout.exercises.every(
    (exercise) => exercise.completed
  );

  if (!isWorkoutCompleted) {
    throw createHttpError(400, "Workout is not complete");
  }

  if (!workout) {
    throw createHttpError(400, "Missing or Invalid Workout History Fields");
  }

  try {
    const workoutHistory = await WorkoutHistoryModel.findOne({ userId });

    if (!workoutHistory) {
      throw createHttpError(404, "Workout history is not found for this user");
    }

    workoutHistory.workouts.push(workout);

    await workoutHistory.save();

    return workoutHistory;
  } catch (error) {
    console.error(error);
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw createHttpError(
      500,
      "An unexpected workout history service error has occured"
    );
  }
};
