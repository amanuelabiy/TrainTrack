import createHttpError from "http-errors";
import WorkoutHistoryModel from "../models/WorkoutHistory";
import mongoose, { Types } from "mongoose";
import { WorkoutData } from "types/types";
import WorkoutModel, { IWorkout } from "../models/Workout";
import ExerciseModel from "../models/Exercise";

interface WorkoutToAdd {
  userId: Types.ObjectId;
  workoutIds: Types.ObjectId[];
}

export const addWorkoutToHistory = async (workoutToAdd: WorkoutToAdd) => {
  const { userId, workoutIds } = workoutToAdd;

  try {
    for (const workoutId of workoutIds) {
      if (!mongoose.isValidObjectId(workoutId)) {
        throw createHttpError(400, "Invalid workout Id for workout history");
      }
    }

    const workouts: (IWorkout | null)[] = await Promise.all(
      workoutIds.map(async (workoutId) => {
        return await WorkoutModel.findById(workoutId)
          .populate("exercises")
          .exec();
      })
    );

    const workoutsExist = workouts.every((workout) => workout !== null);

    if (!workoutsExist) {
      throw createHttpError(400, "One or more workouts not found");
    }

    const isWorkoutCompleted = workouts.every((workout) => {
      if (workout && Array.isArray(workout.exercises)) {
        return workout.exercises.every((exercise) => {
          if (typeof exercise === "object" && "completed" in exercise) {
            return exercise.completed;
          }
          return false;
        });
      }

      return false;
    });

    if (!isWorkoutCompleted) {
      throw createHttpError(400, "All exercises must be marked as completed");
    }

    const workoutHistory = await WorkoutHistoryModel.findOne({ userId });

    if (!workoutHistory) {
      throw createHttpError(404, "Workout history is not found for this user");
    }

    for (const workoutId of workoutIds) {
      workoutHistory.workouts.push(workoutId);
    }

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
