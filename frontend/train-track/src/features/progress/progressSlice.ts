import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProgressState } from "@/types";

const initialState: ProgressState = {
  progressData: [],
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
});

export default progressSlice.reducer;
