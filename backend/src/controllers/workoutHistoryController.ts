import { RequestHandler } from "express";
import { assertIsDefined } from "../utils/assertIsDefined";
import * as workoutHistoryService from "../services/workoutHistoryService";
import createHttpError from "http-errors";
import { TypeExpressionOperatorReturningBoolean, Types } from "mongoose";
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

export const getWorkoutHistory: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    assertIsDefined(userId);
    const workoutHistory = await workoutHistoryService.getWorkoutHistory(
      userId
    );

    res.status(200).json(workoutHistory);
  } catch (error) {
    next(error);
  }
};

export const deleteLatestWorkoutFromHistory: RequestHandler<{
  workoutId: string;
}> = async (req, res, next) => {
  const { workoutId } = req.params;
  const userId = req.session.userId;
  try {
    if (!workoutId) {
      throw createHttpError(400, "Missing workout ID");
    }
    assertIsDefined(userId);

    const updatedWorkoutHistory =
      await workoutHistoryService.deleteLatestWorkoutFromHistory(
        userId,
        workoutId
      );

    if (!updatedWorkoutHistory) {
      throw createHttpError(404, "Workout history or workout not found");
    }

    res.status(200).json(updatedWorkoutHistory);
  } catch (error) {
    next(error);
  }
};

export const getSecondLatestWorkoutFromHistory: RequestHandler<{
  workoutId: string;
}> = async (req, res, next) => {
  const { workoutId } = req.params;
  const userId = req.session.userId;

  try {
    if (!workoutId) {
      throw createHttpError(400, "Missing workout ID");
    }
    assertIsDefined(userId);

    const secondLatestWorkoutFromHistory =
      await workoutHistoryService.getSecondLatestWorkoutFromHistory(
        userId,
        workoutId
      );

    if (secondLatestWorkoutFromHistory) {
      res.status(200).json(secondLatestWorkoutFromHistory);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    next(error);
  }
};
