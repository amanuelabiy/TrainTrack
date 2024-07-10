import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutPlanState, Workout } from "@/types/workoutTypes";

const initialState: WorkoutPlanState = {
  workouts: [],
  loading: false,
  error: null,
};

const workoutPlanSlice = createSlice({
  name: "workout plan",
  initialState,
  reducers: {
    setWorkoutPlans(state, action: PayloadAction<Workout[]>) {
      state.workouts = action.payload;
    },
  },
});

export const { setWorkoutPlans } = workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
