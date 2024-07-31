import { Exercise } from "@/types/workoutTypes";

export function calcExerciseCompletion(exercise: Exercise): number | null {
  const totalSets = exercise.sets;
  let completedSets = 0;

  if (exercise.workingSets) {
    for (const set of exercise.workingSets) {
      if (set.completed) {
        completedSets += 1;
      }
    }

    const completedRatio = (completedSets / totalSets) * 100;

    return completedRatio;
  } else {
    return null;
  }
}
