import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { recipeService } from "../../services/recipe.service";
import { Dispatch } from "react";
import { UserObj } from "../../types/user";
import { userService } from "../../services/user.service";

export interface UsersState {
  users: any[];
  loggedinUser: UserObj 
}

const initialState: UsersState = {
  users: [],
  loggedinUser: {
    username: 'guest',
    fullname: 'guest',
    password: 'guest',
    imgUrl:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    _id:'0000',
    pantry:[],
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoggedinUser: (state, action) => {
      state.loggedinUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addIng: (state, action) => {
      if (state.loggedinUser) {
        userService.updatePantry({
          _id: state.loggedinUser._id,
          ingName: action.payload,
          flag:true
        });
        state.loggedinUser.pantry.push(action.payload);
      }
    },
    removeIng: (state, action) => {
      if(state.loggedinUser){
        userService.updatePantry({
          _id: state.loggedinUser._id,
          ingName: action.payload,
          flag:true
        });
        const idx = state.loggedinUser.pantry.findIndex(ing=>ing === action.payload)
        state.loggedinUser.pantry.splice(idx,1)
      }
    },
  },
});
export const { setUsers, setLoggedinUser, addIng, removeIng } =
  usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectLoggedinUser = (state: RootState) =>
  state.users.loggedinUser;
export default usersSlice.reducer;
