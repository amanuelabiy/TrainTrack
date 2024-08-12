import {
  type Workout,
  type WorkoutResponse,
  type AllWorkoutReponse,
  Day,
  type UpdatedWorkout,
} from "@/types/workoutTypes";

export const productionUrl = "http://localhost:5001/api";

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, { ...init, credentials: "include" });
  const contentType = response.headers.get("content-type");
  if (response.ok) {
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return null;
    }
  } else {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const errorBody = await response.json();
      const errorMessage = errorBody.error;
      throw Error(errorMessage);
    } else {
      throw Error("Unknown error occured");
    }
  }
}

export async function fetchWorkouts(): Promise<AllWorkoutReponse> {
  const response = await fetchData(`${productionUrl}/workouts`, {
    method: "GET",
  });
  return response;
}

export async function fetchtWorkoutsForDay(
  day: Day
): Promise<AllWorkoutReponse> {
  const response = await fetchData(`${productionUrl}/workouts/day/${day}`, {
    method: "GET",
  });

  return response;
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
  return response;
}

export async function updateWorkout(
  workout: UpdatedWorkout
): Promise<WorkoutResponse> {
  const { _id } = workout;
  const response = await fetchData(`${productionUrl}/workouts/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  return response;
}

export async function deleteWorkout(
  workout: WorkoutResponse
): Promise<WorkoutResponse> {
  const { _id } = workout;
  const response = await fetchData(`${productionUrl}/workouts/${_id}`, {
    method: "DELETE",
  });

  return response;
}
