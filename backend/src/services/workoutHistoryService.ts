import createHttpError from "http-errors";
import WorkoutHistoryModel from "../models/WorkoutHistory";
import mongoose, { Types } from "mongoose";
import WorkoutModel, { IWorkout } from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { IWorkoutHistoryWorkout } from "../models/WorkoutHistoryWorkout";

interface WorkoutToAdd {
  userId: Types.ObjectId;
  workouts: IWorkoutHistoryWorkout[];
}

export const addWorkoutToHistory = async (workoutToAdd: WorkoutToAdd) => {
  if (
    !workoutToAdd ||
    !workoutToAdd.workouts ||
    workoutToAdd.workouts.length === 0
  ) {
    throw createHttpError(
      400,
      "Missing or Invalid Workout History Fields in Service"
    );
  }
  const { userId, workouts } = workoutToAdd;

  try {
    // for (const workout of workouts) {
    //   if (!mongoose.isValidObjectId(workout._id)) {
    //     throw createHttpError(400, "Invalid workout Id for workout history");
    //   }
    // }

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

    for (const workout of workouts) {
      const workoutHistoryEntry = { ...workout, workoutId: workout._id };

      workoutHistory.workouts.push(workoutHistoryEntry);
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
