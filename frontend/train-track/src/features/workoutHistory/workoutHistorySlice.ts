import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  type HistoryResponse,
  type Workout,
  type WorkoutHistoryResponse,
} from "@/types/workoutTypes";
import { convertHistoryResponse } from "@/utils/convertHistoryResponse";

interface WorkoutPlanState {
  loading: boolean;
  error: string | null;
  workoutHistory: WorkoutHistoryResponse[];
}

const initialState: WorkoutPlanState = {
  loading: false,
  error: null,
  workoutHistory: [],
};

const workoutPlanSlice = createSlice({
  name: "workout plan",
  initialState,
  reducers: {
    setWorkoutHistory(state, action: PayloadAction<HistoryResponse[]>) {
      const workoutHistory = convertHistoryResponse(action.payload);

      state.workoutHistory = workoutHistory;
    },
  },
});

export const { setWorkoutHistory } = workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
