import { RequestHandler } from "express";
import { IWorkout } from "models/Workout";
import { assertIsDefined } from "../utils/assertIsDefined";
import * as workoutHistoryService from "../services/workoutHistoryService";
import { WorkoutData } from "types/types";
import createHttpError from "http-errors";
import { Types } from "mongoose";

interface WorkoutHistoryBody {
  workoutIds: Types.ObjectId[];
}

export const addWorkoutToHistory: RequestHandler<
  unknown,
  unknown,
  WorkoutHistoryBody,
  unknown
> = async (req, res, next) => {
  const { workoutIds } = req.body;
  const userId = req.session.userId;

  if (!workoutIds) {
    createHttpError(400, "Missing or Invalid Workout History Fields");
  }

  try {
    assertIsDefined(userId);
    const updatedWorkoutHistory =
      await workoutHistoryService.addWorkoutToHistory({
        userId,
        workoutIds,
      });
    res.status(201).json(updatedWorkoutHistory);
  } catch (error) {
    next(error);
  }
};
