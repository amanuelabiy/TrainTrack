import { type TodayWorkout } from "@/components/today/TodayWorkoutCard";
import { type WorkoutResponse } from "@/types/workoutTypes";

export function calcWorkoutCompletion(
  workout: WorkoutResponse | TodayWorkout
): number {
  const totalExercises = workout.exercises.length;
  let completedExercises = 0;

  for (const exercise of workout.exercises) {
    if (exercise.completed) {
      completedExercises += 1;
    }
  }

  const completedRatio = (completedExercises / totalExercises) * 100;

  return Math.round(completedRatio);
}

export function calcWorkoutHasStarted(
  workout: WorkoutResponse | TodayWorkout
): boolean {
  for (const exercise of workout.exercises) {
    if (exercise.workingSets) {
      for (const workingSet of exercise.workingSets) {
        if (workingSet.completed) return true;
      }
    }
  }

  return false;
}
