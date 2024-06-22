import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workout, WorkoutState } from "@/types";

const initialState: WorkoutState = {
  workouts: [],
  loading: true,
  error: null,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
});

export default workoutSlice.reducer;
