import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("userAuthToken");
const user = token ? { token } : null;

const initialState = {
  user: user,
};

const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userAuthToken");
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = customerSlice.actions;

export default customerSlice.reducer;
