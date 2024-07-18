import { WorkoutResponse } from "@/types/workoutTypes";

export function calcWorkoutCompletion(workout: WorkoutResponse): number {
  const totalExercises = workout.exercises.length;
  let completedExercises = 0;

  for (const exercise of workout.exercises) {
    if (exercise.completed) {
      completedExercises += 1;
    }
  }

  const completedRatio = (completedExercises / totalExercises) * 100;

  return completedRatio;
}
