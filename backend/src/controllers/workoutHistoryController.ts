import { RequestHandler } from "express";
import { assertIsDefined } from "../utils/assertIsDefined";
import * as workoutHistoryService from "../services/workoutHistoryService";
import createHttpError from "http-errors";
import { Types } from "mongoose";
import { IWorkoutHistoryWorkout } from "models/WorkoutHistoryWorkout";

export const addWorkoutToHistory: RequestHandler<
  unknown,
  unknown,
  IWorkoutHistoryWorkout[],
  unknown
> = async (req, res, next) => {
  const workouts = req.body;
  const userId = req.session.userId;

  try {
    if (!workouts) {
      throw createHttpError(400, "Missing or Invalid Workout History Fields");
    }
    assertIsDefined(userId);

    console.log("Workouts:", workouts);
    const updatedWorkoutHistory =
      await workoutHistoryService.addWorkoutToHistory({
        userId,
        workouts,
      });
    res.status(201).json(updatedWorkoutHistory);
  } catch (error) {
    next(error);
  }
};
