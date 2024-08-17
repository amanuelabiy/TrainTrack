import {
  type HistoryResponse,
  type WorkoutHistoryResponse,
} from "@/types/workoutTypes";

export function convertHistoryResponse(
  workoutHistoryResponse: HistoryResponse[]
): WorkoutHistoryResponse[] {
  const workouts: WorkoutHistoryResponse[] = [];
  for (const workoutHistory of workoutHistoryResponse) {
    for (const workout of workoutHistory.workouts) {
      workouts.push(workout);
    }
  }

  return workouts;
}
