import { TodayWorkout } from "@/components/today/TodayWorkoutCard";
import { RootState } from "@/store";
import { type Exercise, type WorkingSet } from "@/types/workoutTypes";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import * as WorkoutsApi from "@/network/workout_api";
import { toast } from "react-toastify";
import { calcWorkoutCompletion } from "@/utils/calcWorkoutCompletion";

interface TodaysWorkoutState {
  workoutsForToday: TodayWorkout[] | null;
  startedWorkout: TodayWorkout | null;
  loading: boolean;
  error: string | null;
}

type ExerciseWithWorkingSet = {
  exercise: Exercise;
  workingSets: WorkingSet[];
};

const initialState: TodaysWorkoutState = {
  workoutsForToday: null,
  startedWorkout: null,
  loading: false,
  error: null,
};

export const handleInProgressSaveClick = createAsyncThunk(
  "todaysWorkout/handleInProgressSaveClick",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const savedWorkout = state.todaysWorkoutState.startedWorkout;

    if (!savedWorkout) {
      throw new Error("No workout in progress");
    }

    const { workingOut, ...displayedWorkoutData } = savedWorkout;

    await WorkoutsApi.updateWorkout(displayedWorkoutData);

    return savedWorkout;
  }
);

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
    endTodaysWorkout: (state, action: PayloadAction<TodayWorkout>) => {
      state.workoutsForToday = state.workoutsForToday
        ? state.workoutsForToday.map((workout) =>
            workout._id === action.payload._id
              ? { ...workout, workingOut: false }
              : workout
          )
        : null;

      state.startedWorkout = null;
    },
    handleDialogSaveClick: (
      state,
      action: PayloadAction<ExerciseWithWorkingSet>
    ) => {
      const { exercise, workingSets } = action.payload;
      if (!state.startedWorkout) throw new Error("No Workout in progress");

      const newExercises = state.startedWorkout.exercises.map(
        (displayedExercise) =>
          displayedExercise._id === exercise._id
            ? {
                ...displayedExercise,
                workingSets,
              }
            : displayedExercise
      );

      const updatedExercises = newExercises.map((exercise) => {
        if (exercise.workingSets) {
          const allSetsCompleted = exercise.workingSets.every(
            (set) => set.completed
          );

          console.log("All sets completed", allSetsCompleted);
          return { ...exercise, completed: allSetsCompleted };
        }

        return exercise;
      });

      const updatedStartedWorkout = {
        ...state.startedWorkout,
        exercises: updatedExercises,
      };

      state.startedWorkout = updatedStartedWorkout;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleInProgressSaveClick.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        handleInProgressSaveClick.fulfilled,
        (state, action: PayloadAction<TodayWorkout>) => {
          state.loading = false;
          state.startedWorkout = null;
          state.workoutsForToday = state.workoutsForToday
            ? state.workoutsForToday.map((workout) =>
                workout._id === action.payload._id ? action.payload : workout
              )
            : null;
          if (calcWorkoutCompletion(action.payload) === 100) {
            toast.success("Workout Complete! 🥳");
          }
        }
      )
      .addCase(handleInProgressSaveClick.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save workout";
        toast.error(state.error);
      });
  },
});

export const {
  setTodaysWorkouts,
  startTodaysWorkout,
  endTodaysWorkout,
  handleDialogSaveClick,
} = todaysWorkoutSlice.actions;

export default todaysWorkoutSlice.reducer;
