import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./features/theme/themeSlice";
import workoutPlanReducer from "./features/workoutPlan/workoutPlanSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    workoutPlanState: workoutPlanReducer,
    themeState: themeReducer,
    auth: authReducer,
  },
});

// store.subscribe(() => {
//   saveState(store.getState().auth);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
