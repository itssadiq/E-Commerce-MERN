import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    registerUser: () => {},
  },
});

export const { registerUser } = authSlice.actions;

export default authSlice.reducer;
