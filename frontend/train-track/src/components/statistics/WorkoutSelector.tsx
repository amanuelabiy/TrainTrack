import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";
import { useLoaderData } from "react-router-dom";
import { Button } from "../ui/button";
import NoWorkouts from "./NoWorkouts";
import WorkoutMenu from "./WorkoutMenu";

function WorkoutSelector() {
  const { workouts } = useLoaderData() as WorkoutHistoryLoaderReturn;

  return (
    <div className="border-4 border-black flex-grow ">
      {workouts.length === 0 ? <NoWorkouts /> : <WorkoutMenu />}
    </div>
  );
}

export default WorkoutSelector;
