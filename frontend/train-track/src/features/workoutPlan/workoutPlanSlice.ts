import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutPlanState, WorkoutPlan } from "@/types/workoutTypes";

const initialState: WorkoutPlanState = {
  workoutPlans: [],
  loading: false,
  error: null,
};

const workoutPlanSlice = createSlice({
  name: "workout plan",
  initialState,
  reducers: {
    setWorkoutPlans(state, action: PayloadAction<WorkoutPlan[]>) {
      state.workoutPlans = action.payload;
    },
  },
});

export const { setWorkoutPlans } = workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
