import { WorkoutResponse } from "@/types/workoutTypes";
import { useLoaderData } from "react-router-dom";
import WorkoutsCarousel from "./WorkoutsCarousel";
import { useEffect } from "react";
import InProgressWorkout from "./InProgressWorkout";
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

  return (
    <div className="mt-10">
      <h1 className="text-[18px] font-bold tracking-tight mb-3 ml-[8px]">
        Workout Log
      </h1>
      {todaysWorkouts && todaysWorkouts.length > 0 ? (
        hasStartedWorkout ? (
          <InProgressWorkout />
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
