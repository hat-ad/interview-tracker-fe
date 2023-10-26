import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  clientToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      state.clientToken = null;
      state.user = null;
    },
    loginUser: (state, action) => {
      state.clientToken = action.payload.token;
      state.user = action.payload.user;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export default authSlice.reducer;

export const { logout, loginUser, updateUser } = authSlice.actions;
