import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectStartedWorkout = (state: RootState) =>
  state.todaysWorkoutState.startedWorkout;

export const selectHasStartedWorkout = createSelector(
  [selectStartedWorkout],
  (startedWorkout) => !!startedWorkout
);
