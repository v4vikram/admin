import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const token = localStorage.getItem("userAuthToken");
const user = token ? { token } : null;

const initialState = {
  user: user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      toast.success("Logout successfully");
      localStorage.removeItem("userAuthToken");
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
