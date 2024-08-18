import { useLoaderData } from "react-router-dom";
import { type WorkoutHistoryResponse } from "@/types/workoutTypes";
import { useAppDispatch } from "@/hooks";
import { setWorkoutHistory } from "@/features/workoutHistory/workoutHistorySlice";
import { useEffect, useState } from "react";
import WorkoutSelector from "@/components/statistics/WorkoutSelector";
import WorkoutGraph from "@/components/statistics/WorkoutGraph";
import ExerciseGraph from "@/components/statistics/ExerciseGraph";
import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";

function Statistics() {
  const { workoutHistory } = useLoaderData() as WorkoutHistoryLoaderReturn;
  const dispatch = useAppDispatch();
  const [workout, setWorkout] = useState<WorkoutHistoryResponse | null>(null);

  useEffect(() => {
    dispatch(setWorkoutHistory(workoutHistory));
  }, [dispatch, workoutHistory]);

  return (
    <div className="flex h-[89vh]">
      <WorkoutSelector />
      <div className="flex flex-col flex-grow">
        <WorkoutGraph />
        <ExerciseGraph />
      </div>
    </div>
  );
}

export default Statistics;
