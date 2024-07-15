import {
  type Workout,
  type WorkoutResponse,
  type AllWorkoutReponse,
} from "@/types/workoutTypes";

const productionUrl = "http://localhost:5000/api";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchWorkouts(): Promise<AllWorkoutReponse> {
  const response = await fetchData(`${productionUrl}/workouts`, {
    method: "GET",
  });
  return response.json();
}

export async function createWorkout(
  workout: Workout
): Promise<WorkoutResponse> {
  const response = await fetchData(`${productionUrl}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  return response.json();
}
