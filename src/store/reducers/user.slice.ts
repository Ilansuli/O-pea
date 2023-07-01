import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RefubrishedUserObj } from "../../types/user";
import { RecipeObj } from "../../types/recipe";
import { AisleArr } from "../../types/aisle";

import { RootState } from "../store";
interface UsersState {
  users: any[];
  loggedinUser: RefubrishedUserObj;
  isUserPantry: boolean;
}

const initialState: UsersState = {
  users: [],
  loggedinUser: {
    fullname: "guest",
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    _id: "0000",
    pantry: [],
    favourites: [],
  },
  isUserPantry: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    SET_LOGGEDIN_USER: (
      state: UsersState,
      action: PayloadAction<RefubrishedUserObj>
    ) => {
      state.loggedinUser = action.payload;
    },
    SET_USERS: (
      state: UsersState,
      action: PayloadAction<RefubrishedUserObj[]>
    ) => {
      state.users = action.payload;
    },
    UPDATE_PANTRY: (state: UsersState, action: PayloadAction<AisleArr>) => {
      state.loggedinUser.pantry = action.payload;
    },
    UPDATE_FAVOURITES: (
      state: UsersState,
      action: PayloadAction<RecipeObj[]>
    ) => {
      state.loggedinUser.favourites = action.payload;
      console.log(state.loggedinUser.favourites);
    },
    HANDLE_IS_USER_PANTRY: (state: UsersState) => {
      state.isUserPantry = !state.isUserPantry;
    },
  },
});

export const {
  SET_LOGGEDIN_USER,
  SET_USERS,
  UPDATE_PANTRY,
  UPDATE_FAVOURITES,
  HANDLE_IS_USER_PANTRY,
} = userSlice.actions;
// export const selectUsers = (state: RootState) => state.users.users;
export const selectLoggedinUser = (state: RootState) => state.user.loggedinUser;
export const selectIsUserPantry = (state: RootState) => state.user.isUserPantry;

export default userSlice;
