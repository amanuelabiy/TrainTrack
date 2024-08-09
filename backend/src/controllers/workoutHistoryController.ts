import { RequestHandler } from "express";
import { assertIsDefined } from "../utils/assertIsDefined";
import * as workoutHistoryService from "../services/workoutHistoryService";
import createHttpError from "http-errors";
import { Types } from "mongoose";
import { IWorkoutHistoryWorkout } from "models/WorkoutHistoryWorkout";

interface WorkoutHistoryBody {
  workouts: IWorkoutHistoryWorkout[];
}

export const addWorkoutToHistory: RequestHandler<
  unknown,
  unknown,
  WorkoutHistoryBody,
  unknown
> = async (req, res, next) => {
  const { workouts } = req.body;
  const userId = req.session.userId;

  if (!workouts) {
    createHttpError(400, "Missing or Invalid Workout History Fields");
  }

  try {
    assertIsDefined(userId);
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
