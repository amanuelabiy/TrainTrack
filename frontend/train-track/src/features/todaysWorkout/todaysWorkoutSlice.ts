import { TodayWorkout } from "@/components/today/TodayWorkoutCard";
import { WorkoutResponse } from "@/types/workoutTypes";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface TodaysWorkoutState {
  workoutsForToday: TodayWorkout[] | null;
  startedWorkout: TodayWorkout | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodaysWorkoutState = {
  workoutsForToday: null,
  startedWorkout: null,
  loading: false,
  error: null,
};

const todaysWorkoutSlice = createSlice({
  name: "todaysWorkout",
  initialState,
  reducers: {
    setTodaysWorkouts: (state, action: PayloadAction<TodayWorkout[]>) => {
      state.workoutsForToday = action.payload;
    },
    startTodaysWorkout: (state, action: PayloadAction<TodayWorkout>) => {
      state.workoutsForToday = state.workoutsForToday
        ? state.workoutsForToday.map((workout) =>
            workout._id === action.payload._id
              ? { ...workout, workingOut: true }
              : workout
          )
        : null;

      state.startedWorkout = action.payload;
    },
    checkForStartedWorkout: (state) => {
      return state.startedWorkout;
    },
  },
});

export const { setTodaysWorkouts } = todaysWorkoutSlice.actions;

export default todaysWorkoutSlice.reducer;
