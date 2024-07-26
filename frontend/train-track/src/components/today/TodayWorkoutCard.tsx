import { WorkoutResponse } from "@/types/workoutTypes";
import { useLoaderData } from "react-router-dom";
import WorkoutsCarousel from "./WorkoutsCarousel";
import { useState } from "react";
import InProgressWorkout from "./InProgressWorkout";

export interface TodayWorkout extends WorkoutResponse {
  workingOut: boolean;
}

function TodayWorkoutCard() {
  const workoutsForTheDayData = useLoaderData() as WorkoutResponse[];

  const [workoutsForTheDay, setWorkoutsForTheDay] = useState(
    workoutsForTheDayData.map((workout) => ({ ...workout, workingOut: false }))
  );

  const startWorkout = (workoutId: string) => {
    setWorkoutsForTheDay((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === workoutId ? { ...workout, workingOut: true } : workout
      )
    );
  };

  const checkForStartedWorkout = () => {
    return workoutsForTheDay.find((workout) => workout.workingOut);
  };

  const startedWorkout = checkForStartedWorkout();

  return (
    <div className="mt-10">
      <h1 className="text-[18px] font-bold tracking-tight mb-3 ml-[8px]">
        Workout Log
      </h1>
      {workoutsForTheDay.length > 0 ? (
        startedWorkout ? (
          <InProgressWorkout workout={startedWorkout} />
        ) : (
          <WorkoutsCarousel
            workouts={workoutsForTheDay}
            startWorkout={startWorkout}
          />
        )
      ) : (
        <div>no workouts for today</div>
      )}
    </div>
  );
}

export default TodayWorkoutCard;
