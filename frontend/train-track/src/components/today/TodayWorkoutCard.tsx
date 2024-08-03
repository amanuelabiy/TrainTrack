import { WorkoutResponse } from "@/types/workoutTypes";
import { useLoaderData } from "react-router-dom";
import WorkoutsCarousel from "./WorkoutsCarousel";
import { useEffect, useState } from "react";
import InProgressWorkout from "./InProgressWorkout";
import { toast } from "react-toastify";
import * as WorkoutsApi from "@/network/workout_api";
import { calcWorkoutCompletion } from "@/utils/calcWorkoutCompletion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setTodaysWorkouts } from "@/features/todaysWorkout/todaysWorkoutSlice";
import { RootState } from "@/store";
import { selectHasStartedWorkout } from "@/features/selectors/selectors";
import { useSelector } from "react-redux";

export interface TodayWorkout extends WorkoutResponse {
  workingOut: boolean;
}

function TodayWorkoutCard() {
  const workoutsForTheDayData = useLoaderData() as WorkoutResponse[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setTodaysWorkouts(
        workoutsForTheDayData.map((workout) => ({
          ...workout,
          workingOut: false,
        }))
      )
    );
  }, [dispatch, workoutsForTheDayData]);

  const todaysWorkouts = useAppSelector(
    (state: RootState) => state.todaysWorkoutState.workoutsForToday
  );

  const hasStartedWorkout = useSelector(selectHasStartedWorkout);

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

      endWorkout(updatedWorkout._id);
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

  return (
    <div className="mt-10">
      <h1 className="text-[18px] font-bold tracking-tight mb-3 ml-[8px]">
        Workout Log
      </h1>
      {todaysWorkouts && todaysWorkouts.length > 0 ? (
        hasStartedWorkout ? (
          <InProgressWorkout
            handleInProgressSaveClick={handleInProgressSaveClick}
          />
        ) : (
          <WorkoutsCarousel />
        )
      ) : (
        <div>no workouts for today</div>
      )}
    </div>
  );
}

export default TodayWorkoutCard;
