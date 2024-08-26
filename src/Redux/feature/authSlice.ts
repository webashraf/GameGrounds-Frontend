import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TAuth = {
  user: null | string;
  token: null | string;
};

const initialState: TAuth = {
  user: null,
  token: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useToken = (state: RootState) => state.auth.token;

export const currentUser = (state: RootState) => state.auth.user;
