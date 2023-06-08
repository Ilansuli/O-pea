import { RootState } from "../store";
import { createSlice, current } from "@reduxjs/toolkit";

import { UserObj } from "../../types/user";
import { userService } from "../../services/user.service";
import { aisleService } from "../../services/aisle.service";

export interface UsersState {
  users: any[];
  loggedinUser: UserObj;
  isUserPantry: boolean;
}

const initialState: UsersState = {
  users: [],
  loggedinUser: {
    username: "guest",
    fullname: "guest",
    password: "guest",
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    _id: "0000",
    pantry: [],
  },
  isUserPantry: false,
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
      const pantry = state.loggedinUser.pantry;
      const ing = action.payload;
      userService.updatePantry({
        userId: state.loggedinUser._id,
        ing: action.payload,
        flag: true,
      });
      const idx = pantry.findIndex((aisle) => aisle._id === ing.aisleId);
      if (idx === -1) {
        const aisle = aisleService
          .getAisles()
          .find((aisle) => aisle._id === ing.aisleId);
        pantry.push({
          name: aisle.name,
          imgURL: aisle.imgURL,
          _id: aisle._id,
          ings: [ing],
        });
      } else {
        pantry[idx].ings.push(ing);
      }
    },
    removeIng: (state, action) => {
      const pantry = state.loggedinUser.pantry;
      const ing = action.payload;

      userService.updatePantry({
        userId: state.loggedinUser._id,
        ing: action.payload,
        flag: true,
      });
      const aisleIdx = pantry.findIndex((aisle) => aisle._id === ing.aisleId);
      const ingIdx = pantry[aisleIdx].ings.findIndex((i) => i._id === ing._id);
      pantry[aisleIdx].ings.splice(ingIdx, 1);
      if (pantry[aisleIdx].ings.length === 0) {
        pantry.splice(aisleIdx, 1);
      }
    },
    handleIsUserPantry: (state) => {
      state.isUserPantry = !state.isUserPantry;
    },
  },
});
export const {
  setUsers,
  setLoggedinUser,
  addIng,
  removeIng,
  handleIsUserPantry,
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectLoggedinUser = (state: RootState) =>
  state.users.loggedinUser;
export const selectIsUserPantry = (state: RootState) =>
  state.users.isUserPantry;

export default usersSlice.reducer;
