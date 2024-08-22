import { useLoaderData } from "react-router-dom";
import { type WorkoutHistoryResponse } from "@/types/workoutTypes";
import { useAppDispatch } from "@/hooks";
import { setWorkoutHistory } from "@/features/workoutHistory/workoutHistorySlice";
import { useEffect, useState } from "react";
import WorkoutSelector from "@/components/statistics/WorkoutSelector";
import WorkoutGraph from "@/components/statistics/WorkoutGraph";
import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";
import ExerciseGraph from "@/components/statistics/ExerciseGraph";

function Statistics() {
  const { workoutHistory } = useLoaderData() as WorkoutHistoryLoaderReturn;
  const dispatch = useAppDispatch();
  const [responseWorkoutId, setResposneWorkoutId] = useState<string | null>(
    null
  );
  const [exerciseId, setExerciseId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setWorkoutHistory(workoutHistory));
  }, [dispatch, workoutHistory]);

  console.log("Workouts inside of Statistics are", workoutHistory);

  return (
    <div className="flex flex-col h-[75vh]">
      <WorkoutSelector
        responseWorkoutId={responseWorkoutId}
        exerciseId={exerciseId}
        setResposneWorkoutId={setResposneWorkoutId}
        setExerciseId={setExerciseId}
      />
      <div className="flex flex-grow">
        <WorkoutGraph
          responseWorkoutId={responseWorkoutId}
          exerciseId={exerciseId}
        />
        {/* <ExerciseGraph /> */}
      </div>
    </div>
  );
}

export default Statistics;
