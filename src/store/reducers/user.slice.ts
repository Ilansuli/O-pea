import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

import { UserObj } from "../../types/user";
import { userService } from "../../services/user.service";
import { aisleService } from "../../services/aisle.service";
import { useAppSelector } from "../../hooks";

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
    favourites: [],
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
      const aisleIdx = pantry.findIndex((aisle) => aisle._id === ing.aisleId);

      let updatedUser: UserObj;
      let updatedPantry = [...pantry];

      //Add Aisle + Ing to the pantry
      if (aisleIdx === -1) {
        const aisle = aisleService
          .getAisles()
          .find((aisle) => aisle._id === ing.aisleId);
        aisle.ings = [];
        aisle.ings.push(ing);
        updatedPantry.push(aisle);
        updatedUser = {
          ...state.loggedinUser,
          pantry: updatedPantry,
        };
        //Add Ing to existing Aisle
      } else {
        updatedPantry[aisleIdx].ings.push(ing);
      }
      updatedUser = {
        ...state.loggedinUser,
        pantry: updatedPantry,
      };
      state.loggedinUser = updatedUser;
      if (state.loggedinUser._id !== "0000")
        userService.updateUser(updatedUser);
    },
    removeIng: (state, action) => {
      const pantry = state.loggedinUser.pantry;
      const ing = action.payload;

      let updatedUser: UserObj;
      let updatedPantry = [...pantry];

      const aisleIdx = pantry.findIndex((aisle) => aisle._id === ing.aisleId);
      const ingIdx = pantry[aisleIdx].ings.findIndex((i) => i._id === ing._id);

      updatedPantry[aisleIdx].ings.splice(ingIdx, 1);
      if (pantry[aisleIdx].ings.length === 0) {
        updatedPantry.splice(aisleIdx, 1);
      }

      updatedUser = {
        ...state.loggedinUser,
        pantry: updatedPantry,
      };
      state.loggedinUser = updatedUser;

      if (state.loggedinUser._id !== "0000")
        userService.updateUser(updatedUser);
    },
    clearOutPantry: (state) => {
      let updatedUser = {
        ...state.loggedinUser,
        pantry: [],
      };
      state.loggedinUser = updatedUser;
      if (state.loggedinUser._id !== "0000")
        userService.updateUser(updatedUser);
    },
    toggleFavouriteRecipe: (state, action) => {
      const recipe = action.payload;
      let updatedUser: UserObj;

      const recipeIdx = state.loggedinUser.favourites.findIndex(
        (r) => r._id === recipe._id
      );

      recipeIdx === -1
        ? //Add to favourites
          (updatedUser = {
            ...state.loggedinUser,
            favourites: [...state.loggedinUser.favourites, recipe],
          })
        : //Remove from favourites
          (updatedUser = {
            ...state.loggedinUser,
            favourites: [
              ...state.loggedinUser.favourites.filter(
                (r) => r._id !== recipe._id
              ),
            ],
          });
      state.loggedinUser = updatedUser;
      userService.updateUser(updatedUser);
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
  toggleFavouriteRecipe
  ,clearOutPantry
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectLoggedinUser = (state: RootState) =>
  state.users.loggedinUser;
export const selectIsUserPantry = (state: RootState) =>
  state.users.isUserPantry;

export default usersSlice.reducer;
