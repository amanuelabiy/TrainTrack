import TodayWorkoutCard from "@/components/today/TodayWorkoutCard";
import {
  type AllWorkoutReponse,
  Day,
  type WorkoutResponse,
} from "@/types/workoutTypes";
import { useState } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import * as WorkoutsApi from "@/network/workout_api";
import { useAppDispatch } from "@/hooks";
import { store } from "@/store";
import { setError } from "../features/auth/authSlice";

export const loader: LoaderFunction =
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

function Today() {
  const [editCard, setEditCard] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight ml-[8px]">
        Today's Workout
      </h1>
      <TodayWorkoutCard />
    </div>
  );
}

export default Today;
