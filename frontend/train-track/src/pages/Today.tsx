import TodayWorkoutCard from "@/components/today/TodayWorkoutCard";
import {
  type AllWorkoutReponse,
  Day,
  type WorkoutResponse,
} from "@/types/workoutTypes";
import { useState } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import * as WorkoutsApi from "@/network/workout_api";

export const loader: LoaderFunction = async (): Promise<AllWorkoutReponse> => {
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
  const response = await WorkoutsApi.fetchtWorkoutsForDay(dayName as Day);

  return response;
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
