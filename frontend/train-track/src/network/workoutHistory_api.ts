import { type WorkoutResponse } from "@/types/workoutTypes";
import { productionUrl } from "./workout_api";
import { fetchData } from "./workout_api";

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
  workout: WorkoutResponse
) {
  const { _id } = workout;
}
