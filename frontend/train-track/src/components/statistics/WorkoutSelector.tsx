import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";
import { useLoaderData } from "react-router-dom";
import { Button } from "../ui/button";

function WorkoutSelector() {
  const { workouts } = useLoaderData() as WorkoutHistoryLoaderReturn;

  return (
    <>
      {workouts.map((workout) => (
        <Button>{workout.workoutName}</Button>
      ))}
    </>
  );
}

export default WorkoutSelector;
