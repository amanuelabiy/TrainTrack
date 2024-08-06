import { RequestHandler } from "express";
import { IWorkout } from "models/Workout";
import { assertIsDefined } from "../utils/assertIsDefined";
import * as workoutHistoryService from "../services/workoutHistoryService";
import { WorkoutData } from "types/types";
import createHttpError from "http-errors";

interface WorkoutHistoryBody {
  workout: WorkoutData;
}

export const addWorkoutToHistory: RequestHandler<
  unknown,
  unknown,
  WorkoutHistoryBody,
  unknown
> = async (req, res, next) => {
  const { workout } = req.body;
  const userId = req.session.userId;

  if (!workout) {
    createHttpError(400, "Missing or Invalid Workout History Fields");
  }

  try {
    assertIsDefined(userId);
    const newAddedWorkout = await workoutHistoryService.addWorkoutToHistory({
      userId,
      workout,
    });
    res.status(201).json(newAddedWorkout);
  } catch (error) {
    next(error);
  }
};
