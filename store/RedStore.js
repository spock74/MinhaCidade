import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },  
    decrement(state) {
      state.counter--;
    },
    increase(state) {
      state.counter = state.counter + state.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});
export default store;

export const counterActions = counterSlice.actions;
