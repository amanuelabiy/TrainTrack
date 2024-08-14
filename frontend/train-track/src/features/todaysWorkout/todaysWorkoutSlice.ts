import { type TodayWorkout } from "@/components/today/TodayWorkoutCard";
import { type AppDispatch, type RootState } from "@/store";
import {
  type WorkoutResponse,
  type Exercise,
  type WorkingSet,
  type WorkoutHistoryResponse,
} from "@/types/workoutTypes";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import * as WorkoutsApi from "@/network/workout_api";
import * as WorkoutHistoryApi from "@/network/workoutHistory_api";
import { toast } from "react-toastify";
import { calcWorkoutCompletion } from "@/utils/calcWorkoutCompletion";

interface TodaysWorkoutState {
  workoutsForToday: TodayWorkout[] | null;
  startedWorkout: TodayWorkout | null;
  loading: boolean;
  error: string | null;
  restartedWorkout: TodayWorkout | null;
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
  restartedWorkout: null,
};

export const handleInProgressSaveClick = createAsyncThunk(
  "todaysWorkout/handleInProgressSaveClick",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const savedWorkout = state.todaysWorkoutState.startedWorkout;

    if (!savedWorkout) {
      throw new Error("No workout in progress");
    }

    const { workingOut, ...displayedWorkoutData } = savedWorkout;

    const { createdAt, updatedAt, __v, isEditing, ...updatedWorkoutData } =
      displayedWorkoutData;

    await WorkoutsApi.updateWorkout(updatedWorkoutData);

    if (calcWorkoutCompletion(savedWorkout) === 100) {
      toast.success("Workout Complete! 🥳");
      dispatch(addWorkoutToHistory());
    }

    return savedWorkout;
  }
);

const addWorkoutToHistory = createAsyncThunk(
  "todaysWorkout/addWorkoutToHistory",
  async (workout, { getState }) => {
    const state = getState() as RootState;
    const savedWorkout = state.todaysWorkoutState.startedWorkout;

    if (!savedWorkout) {
      throw new Error("No workout in progress");
    }
    if (calcWorkoutCompletion(savedWorkout) !== 100) {
      throw new Error("Workout is not complete!");
    }

    const { workingOut, ...displayedWorkoutData } = savedWorkout;

    console.log(
      "Workout that will be added to history from frontend",
      displayedWorkoutData
    );

    await WorkoutHistoryApi.addWorkoutToHistory(displayedWorkoutData);
  }
);

export const handleRestartWorkout = createAsyncThunk(
  "todaysWorkout/handleRestartWorkout",
  async (workout: TodayWorkout, { dispatch, getState }) => {
    await WorkoutHistoryApi.deleteLatestWorkoutFromHistory(workout);
    await dispatch(getSecondLatestWorkoutForRestart(workout));

    const updatedState = getState() as RootState;

    if (updatedState.todaysWorkoutState.restartedWorkout) {
      const restartedWorkout = updatedState.todaysWorkoutState.restartedWorkout;
      console.log("Restarted workout state", restartedWorkout);
      const { workingOut, ...workoutData } = restartedWorkout;

      dispatch(updateStateForAWorkout(restartedWorkout));

      const { createdAt, updatedAt, __v, isEditing, ...updatedWorkoutData } =
        workoutData;

      await WorkoutsApi.updateWorkout(updatedWorkoutData);
    }
  }
);

export const getSecondLatestWorkoutForRestart = createAsyncThunk(
  "todaysWorkout/getSecondLatestWorkout",
  async (workout: TodayWorkout) => {
    const secondLatestWorkout =
      await WorkoutHistoryApi.getSecondLatestWorkoutForRestart(workout);

    return { workout: workout, secondLatestWorkout: secondLatestWorkout };
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

      console.log("Started Workout State:", state.startedWorkout);
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
    updateStateForAWorkout: (state, action: PayloadAction<TodayWorkout>) => {
      state.workoutsForToday = state.workoutsForToday
        ? state.workoutsForToday.map((workout) =>
            workout._id === action.payload._id ? { ...action.payload } : workout
          )
        : null;
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
        }
      )
      .addCase(handleInProgressSaveClick.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save workout";
        toast.error(state.error);
      })
      .addCase(addWorkoutToHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWorkoutToHistory.fulfilled, (state) => {
        state.loading = false;
        state.startedWorkout = null;
        console.log("Adding to Workout History FulFilled!");
      })
      .addCase(addWorkoutToHistory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to Add Workout to History";
        toast.error(state.error);
      })
      .addCase(getSecondLatestWorkoutForRestart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSecondLatestWorkoutForRestart.fulfilled,
        (
          state,
          action: PayloadAction<{
            workout: WorkoutResponse;
            secondLatestWorkout: WorkoutHistoryResponse | null;
          }>
        ) => {
          state.loading = false;

          const { workout, secondLatestWorkout } = action.payload;

          let newWorkoutWithId = null;

          if (secondLatestWorkout !== null) {
            const resetExercises = secondLatestWorkout.exercises
              .map((exercise) => {
                if (exercise.workingSets) {
                  const workingSets = exercise.workingSets.map(
                    (workingSet) => ({
                      ...workingSet,
                      completed: false,
                    })
                  );

                  return {
                    ...exercise,
                    workingSets: workingSets,
                    completed: false,
                  };
                }

                return undefined;
              })
              .filter((exercise) => exercise !== undefined);

            const { workoutId, userId, ...secondLatestWorkoutData } =
              secondLatestWorkout;

            const newWorkout: TodayWorkout = {
              ...secondLatestWorkoutData,
              exercises: resetExercises,
              workingOut: true,
            };

            console.log("New Workout is", newWorkout);

            const { ...workoutData } = newWorkout;

            newWorkoutWithId = { ...workoutData, _id: workoutId };

            state.startedWorkout = newWorkoutWithId;
            state.restartedWorkout = newWorkoutWithId;
          } else if (secondLatestWorkout === null) {
            const resetExercises = workout.exercises.map((exercise) => {
              const workingSets = Array.from({ length: exercise.sets }, () => ({
                weight: 0,
                reps: 0,
                completed: false,
              }));
              return { ...exercise, workingSets, completed: false };
            });
            newWorkoutWithId = {
              ...workout,
              exercises: resetExercises,
              workingOut: true,
            };

            state.startedWorkout = newWorkoutWithId;
            state.restartedWorkout = newWorkoutWithId;
          }
        }
      )
      .addCase(getSecondLatestWorkoutForRestart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to Get Second Latest Workout";
      })
      .addCase(handleRestartWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRestartWorkout.fulfilled, (state) => {
        state.loading = false;
        state.restartedWorkout = null;
        console.log("Restart Complete");
      })
      .addCase(handleRestartWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to Get Restart Workout";
      });
  },
});

export const {
  setTodaysWorkouts,
  startTodaysWorkout,
  endTodaysWorkout,
  handleDialogSaveClick,
  updateStateForAWorkout,
} = todaysWorkoutSlice.actions;

export default todaysWorkoutSlice.reducer;
