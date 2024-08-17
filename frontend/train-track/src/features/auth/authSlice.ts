import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import * as UserApi from "@/network/user_api";
import { type User } from "@/types/user";
import { LoginForm, RegisterForm } from "@/types/accountTypes";
import {
  type HistoryResponse,
  type WorkoutHistoryResponse,
} from "@/types/workoutTypes";
import * as WorkoutHistoryApi from "@/network/workoutHistory_api";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  workoutHistory: WorkoutHistoryResponse[];
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  workoutHistory: [],
  error: null,
};

export const login = createAsyncThunk<User, LoginForm>(
  "auth/login",
  async (credentials: LoginForm) => {
    const response = await UserApi.login(credentials);
    const { _id, username, email, __v } = response;
    return { _id, username, email, __v };
  }
);

export const signUp = createAsyncThunk<User, RegisterForm>(
  "auth/signup",
  async (credentials: RegisterForm) => {
    const response = await UserApi.signUp(credentials);
    const { _id, username, email, __v } = response;
    return { _id, username, email, __v };
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await UserApi.logout();
  return null;
});

export const fetchAuthenticatedUser = createAsyncThunk<User | null>(
  "auth/fetchAuthenticatedUser",
  async () => {
    try {
      const response = await UserApi.getLoggedInUser();
      return response;
    } catch (error) {
      return null;
    }
  }
);

export const fetchWorkoutHistory = createAsyncThunk<HistoryResponse[]>(
  "auth/fetchWorkoutHistory",
  async () => {
    try {
      const response = await WorkoutHistoryApi.fetchWorkoutHistory();
      return response;
    } catch (error) {
      throw new Error(
        "Failed to fetch workout history: " + (error as Error).message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to login";
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to Sign Up";
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to logout";
      })
      .addCase(fetchAuthenticatedUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAuthenticatedUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(fetchAuthenticatedUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch authenticated user";
      })
      .addCase(fetchWorkoutHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchWorkoutHistory.fulfilled,
        (state, action: PayloadAction<HistoryResponse[]>) => {
          state.status = "succeeded";
          const workouts = [];
          for (const workoutHistory of action.payload) {
            for (const workout of workoutHistory.workouts) {
              workouts.push(workout);
            }
          }
          state.workoutHistory = workouts;
        }
      )
      .addCase(fetchWorkoutHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch workout history for user";
      });
  },
});

export const { setError, setUser } = authSlice.actions;

export default authSlice.reducer;
