import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("userAuthToken");
const user = token ? { token } : null;

const initialState = {
  user: user,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.user = action.payload;
    },

  },
});

export const { getAllUsers, logout } = userSlice.actions;

export default userSlice.reducer;
