import { WorkoutResponse } from "@/types/workoutTypes";
import { useLoaderData } from "react-router-dom";
import WorkoutsCarousel from "./WorkoutsCarousel";
import { useState } from "react";
import InProgressWorkout from "./InProgressWorkout";
import { toast } from "react-toastify";
import * as WorkoutsApi from "@/network/workout_api";

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

  const handleCancelClick = (cancelWorkout: TodayWorkout) => {
    setWorkoutsForTheDay((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === cancelWorkout._id
          ? { ...cancelWorkout, workingOut: false }
          : workout
      )
    );
  };

  const handleInProgressSaveClick = async (savedWorkout: TodayWorkout) => {
    try {
      const updatedExercises = savedWorkout.exercises.map((exercise) => {
        if (exercise.workingSets) {
          const allSetsCompleted = exercise.workingSets.every(
            (workingSet) => workingSet.completed
          );

          return { ...exercise, completed: allSetsCompleted };
        }

        return exercise;
      });

      const updatedWorkout = { ...savedWorkout, exercises: updatedExercises };
      const { workingOut, ...updatedWorkoutData } = updatedWorkout;

      await WorkoutsApi.updateWorkout(updatedWorkoutData);

      setWorkoutsForTheDay((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === savedWorkout._id
            ? { ...updatedWorkout, workingOut: false }
            : workout
        )
      );
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error has occurred");
      }
    }
  };

  const startedWorkout = checkForStartedWorkout();

  return (
    <div className="mt-10">
      <h1 className="text-[18px] font-bold tracking-tight mb-3 ml-[8px]">
        Workout Log
      </h1>
      {workoutsForTheDay.length > 0 ? (
        startedWorkout ? (
          <InProgressWorkout
            workout={startedWorkout}
            handleCancelClick={handleCancelClick}
            handleInProgressSaveClick={handleInProgressSaveClick}
          />
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
