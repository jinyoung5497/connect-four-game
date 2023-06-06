import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  name: string;
  age: number;
  email: string;
  toggle: boolean;
};

export type RootState = {
  user: UserState;
};

const initialState: UserState = {
  name: '',
  age: 0,
  email: '',
  toggle: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    login: (state, action:PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.toggle = !state.toggle
    },
    logout: (state, action:PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.toggle = !state.toggle
    }
  }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer