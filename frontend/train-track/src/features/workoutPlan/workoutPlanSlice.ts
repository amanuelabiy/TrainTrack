import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutPlanState } from "@/types";

const initialState: WorkoutPlanState = {
  workoutPlans: [],
  loading: false,
  error: null,
};

const workoutPlanSlice = createSlice({
  name: "workout plan",
  initialState,
  reducers: {},
});

export default workoutPlanSlice.reducer;
