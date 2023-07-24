import { createSlice } from "@reduxjs/toolkit";

interface ICounter {
  isLoggedIn: boolean;
  user: any;
}
let user = null;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user") || "null");
} else {
  console.log("You are on the server");
}

const initialState: ICounter = user
  ? {
      isLoggedIn: true,
      user,
    }
  : {
      isLoggedIn: false,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state) => {
      state.isLoggedIn = false;
    },
    registerFail: (state) => {
      state.isLoggedIn = false;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFail: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
