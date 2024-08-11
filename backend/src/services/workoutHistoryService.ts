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
  try {
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

    for (const workout of workouts) {
      if (!mongoose.isValidObjectId(workout._id)) {
        throw createHttpError(400, "Invalid workout Id for workout history");
      }
    }

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
      const workoutHistoryEntry = {
        workoutId: workout._id,
        workoutName: workout.workoutName,
        exercises: workout.exercises,
        day: workout.day,
        notes: workout.notes,
        userId: userId,
      };

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

export const getWorkoutHistory = async (userId: Types.ObjectId) => {
  try {
    if (!userId) {
      throw createHttpError(401, "User not authenticated");
    }

    const workoutHistory = await WorkoutHistoryModel.find({
      userId: userId,
    }).exec();

    if (
      !workoutHistory ||
      workoutHistory.length === 0 ||
      !Array.isArray(workoutHistory)
    ) {
      throw createHttpError(404, "Workout history is not found for this user");
    }

    console.log("workout history in service is", workoutHistory);

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

export const deleteLatestWorkoutFromHistory = async (
  userId: Types.ObjectId,
  workoutId: string
) => {
  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid Workout id in history service");
    }

    const workoutHistory = await WorkoutHistoryModel.findOne({
      userId: userId,
    });

    if (!workoutHistory) {
      throw createHttpError(404, "Workout history not found for user");
    }

    const lastestWorkoutIndex = workoutHistory.workouts
      .map((workout) => workout.workoutId?.toString())
      .lastIndexOf(workoutId);

    if (lastestWorkoutIndex === -1) {
      throw createHttpError(404, "No matching workout found in history");
    }

    workoutHistory.workouts.splice(lastestWorkoutIndex, 1);

    await workoutHistory.save();

    return workoutHistory;
  } catch (error) {
    console.error(error);
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw createHttpError(
      500,
      "An unexpected workout history deletion service error has occured"
    );
  }
};

export const getSecondLatestWorkoutFromHistory = async (
  userId: Types.ObjectId,
  workoutId: string
) => {
  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid Workout id in history service");
    }

    const workoutHistory = await WorkoutHistoryModel.findOne({
      userId: userId,
    });

    if (!workoutHistory) {
      throw createHttpError(404, "Workout history not found for user");
    }

    const matchingWorkouts = workoutHistory.workouts
      .filter((workout) => workout.workoutId?.toString() === workoutId)
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

    if (matchingWorkouts.length >= 2) {
      const secondLatestWorkout = matchingWorkouts[matchingWorkouts.length - 2];

      return secondLatestWorkout;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw createHttpError(
      500,
      "An unexpected workout history retrieval service error has occured"
    );
  }
};
