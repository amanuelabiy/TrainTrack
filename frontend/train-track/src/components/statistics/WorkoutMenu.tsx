import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";
import { useLoaderData } from "react-router-dom";
import { Button } from "../ui/button";

function WorkoutMenu() {
  const { workouts } = useLoaderData() as WorkoutHistoryLoaderReturn;

  return (
    <div>
      {workouts.map((workout) => (
        <Button>{workout.workoutName}</Button>
      ))}
    </div>
  );
}

export default WorkoutMenu;
