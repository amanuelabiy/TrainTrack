import {
  type WorkoutHistoryResponse,
  type WorkoutResponse,
} from "@/types/workoutTypes";
import { productionUrl } from "./workout_api";
import { fetchData } from "./workout_api";
import { type TodayWorkout } from "@/components/today/TodayWorkoutCard";

export async function addWorkoutToHistory(workout: WorkoutResponse) {
  if (!Array.isArray(workout)) {
    const workoutArray = [];
    workoutArray.push(workout);
    const response = await fetchData(`${productionUrl}/workoutHistory`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutArray),
    });

    return response;
  } else {
    const response = await fetchData(`${productionUrl}/workoutHistory`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });

    return response;
  }
}

export async function getSecondLatestWorkoutForRestart(
  workout: TodayWorkout
): Promise<WorkoutHistoryResponse | null> {
  const { _id } = workout;
  const response = await fetchData(
    `${productionUrl}/workoutHistory/second-latest/${_id}`,
    {
      method: "GET",
    }
  );

  return response;
}

export async function deleteLatestWorkoutFromHistory(
  workout: TodayWorkout
): Promise<void> {
  const { _id } = workout;
  const response = await fetchData(
    `${productionUrl}/workoutHistory/delete-latest/${_id}`,
    {
      method: "PATCH",
    }
  );

  console.log("Response is", response);
}
