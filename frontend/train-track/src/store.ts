import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./features/theme/themeSlice";
import progressReducer from "./features/progress/progressSlice";
import workoutPlanReducer from "./features/workoutPlan/workoutPlanSlice";

export const store = configureStore({
  reducer: {
    progressState: progressReducer,
    workoutPlanState: workoutPlanReducer,
    themeState: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
