import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import * as UserApi from "@/network/user_api";
import { type User } from "@/types/user";
import { LoginForm, RegisterForm } from "@/types/accountTypes";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      });
  },
});

export default authSlice.reducer;
