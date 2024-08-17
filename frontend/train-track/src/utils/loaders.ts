import {
  Day,
  type WorkoutResponse,
  type AllWorkoutReponse,
  type HistoryResponse,
} from "@/types/workoutTypes";
import { type LoaderFunction } from "react-router-dom";
import * as WorkoutHistoryApi from "../network/workoutHistory_api";
import * as WorkoutsApi from "../network/workout_api";
import { setError } from "@/features/auth/authSlice";
import { store } from "@/store";

export interface WorkoutHistoryLoaderReturn {
  workoutHistory: HistoryResponse[];
  workouts: WorkoutResponse[];
}

export const workoutHistoryLoader: LoaderFunction =
  async (): Promise<WorkoutHistoryLoaderReturn> => {
    try {
      const [workoutHistory, workouts] = await Promise.all([
        WorkoutHistoryApi.fetchWorkoutHistory(),
        WorkoutsApi.fetchWorkouts(),
      ]);

      return { workoutHistory, workouts };
    } catch (error) {
      throw new Error(
        "Failed to fetch workout history: " + (error as Error).message
      );
    }
  };

export const todayWorkoutLoader: LoaderFunction =
  async (): Promise<AllWorkoutReponse | null> => {
    const today = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = today.getDay();
    const dayName = days[dayIndex];

    try {
      const response = await WorkoutsApi.fetchtWorkoutsForDay(dayName as Day);

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));

      return null;
    }
  };

export const workoutsLoader: LoaderFunction =
  async (): Promise<AllWorkoutReponse> => {
    const response = await WorkoutsApi.fetchWorkouts();

    return response;
  };
