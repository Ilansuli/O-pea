import { Dispatch } from "@reduxjs/toolkit";
import { RefubrishedUserObj, UserCred } from "../../types/user";

import { IngObj } from "../../types/ingredient";
import { RecipeObj } from "../../types/recipe";
import { AisleObj } from "../../types/aisle";

import { aisleService } from "../../services/aisle.service";
import { userService } from "../../services/user.service";

import { RootState } from "../store";
import {
  SET_LOGGEDIN_USER,
  SET_USERS,
  UPDATE_PANTRY,
  HANDLE_IS_USER_PANTRY,
  UPDATE_FAVOURITES,
} from "../reducers/user.slice";

export const setLoggedinUser = (user: RefubrishedUserObj) => {
  return (dispatch: Dispatch) => {
    console.log("setLoggedinUser,user.action");

    userService.saveLocalUser(user);
    return dispatch(SET_LOGGEDIN_USER(user));
  };
};

export const login = (userCred: UserCred) => async (dispatch: Dispatch) => {
  try {
    const user = await userService.login(userCred);
    dispatch(SET_LOGGEDIN_USER(user));
    return user;
  } catch (err) {
    console.log("Can\t login user,user.action/login ", err);
    return null;
  }
};

export const signup = (userCred: UserCred) => async (dispatch: Dispatch) => {
  try {
    const user = await userService.signup(userCred);
    dispatch(SET_LOGGEDIN_USER(user));
    return user;
  } catch (err) {
    console.log("Can't signup user,user.action/signup ", err);
    return null;
  }
};

export const loadUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const users = await userService.getUsers();
      dispatch(SET_USERS(users));
    } catch (err) {
      console.log("Can't load users,user.action/loadUsers ", err);
    }
  };
};

export const addIngToPantry = (ing: IngObj) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const debounceTimer = setTimeout(async () => {
        const state = getState();
        let pantry = [...state.user.loggedinUser.pantry];
        const aisleIdx = state.user.loggedinUser.pantry.findIndex(
          (aisle: AisleObj) => aisle._id === ing.aisleId
        );
        let aisle: AisleObj;
        //Add Aisle + Ing to the pantry
        if (aisleIdx === -1) {
          aisle = aisleService.getAisleById(ing.aisleId);
          aisle.ings = [ing];
          pantry.push(aisle);
          //Add Ing to existing Aisle
        } else {
          pantry[aisleIdx] = {
            ...pantry[aisleIdx],
            ings: [...pantry[aisleIdx].ings, ing],
          };
        }

        dispatch(UPDATE_PANTRY(pantry));

        if (state.user.loggedinUser._id !== "0000") {
          userService.updateUser({
            ...state.user.loggedinUser,
            pantry: pantry,
          });
        }
      }, 1000);

      return () => {
        clearTimeout(debounceTimer);
      };
    } catch (err) {
      console.log(
        "Can't add Inggredient to pantry. user.action/addIngToPantry",
        err
      );
    }
  };
};
export const removeIngFromPantry =
  (ing: IngObj) => (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const state = getState();
      let pantry = [...state.user.loggedinUser.pantry];
      const aisleIdx = pantry.findIndex((aisle) => aisle._id === ing.aisleId);
      let aisle = pantry[aisleIdx];
      aisle = {
        ...aisle,
        ings: aisle.ings.filter((currIng: IngObj) => currIng._id !== ing._id),
      };
      pantry[aisleIdx] = aisle;
      if (pantry[aisleIdx].ings.length === 0) {
        pantry.splice(aisleIdx, 1);
      }
      dispatch(UPDATE_PANTRY(pantry));

      if (state.user.loggedinUser._id !== "0000") {
        userService.updateUser({ ...state.user.loggedinUser, pantry });
      }
    } catch (err) {
      console.log(
        "Can't remove Ingredient from pantry. user.actio{n/revmoeIngFromPantry",
        err
      );
    }
  };

export const clearPantry = () => {
  return async (dispatch: Dispatch) => {
    try {
      const emptyPantry = [];
      dispatch(UPDATE_PANTRY(emptyPantry));
    } catch (err) {
      console.log("Can\t clear Pantry,user.action/clearPantry ", err);
    }
  };
};
export const toggleFavourite = (recipe: RecipeObj) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const state = getState();
      let favourites = [...state.user.loggedinUser.favourites];
      const recipeIdx = favourites.findIndex(
        (currRecipe: RecipeObj) => currRecipe._id === recipe._id
      );
      recipeIdx === -1
        ? //Add to favourites
          (favourites = [...favourites, recipe])
        : //Remove from favourites
          (favourites = favourites.filter(
            (recipe) => recipe._id !== favourites[recipeIdx]._id
          ));

      dispatch(UPDATE_FAVOURITES(favourites));
      if (state.user.loggedinUser._id !== "0000")
        userService.updateUser({ ...state.user.loggedinUser, favourites });
    } catch (err) {
      console.log("Can\t Toggle Favourite,user.action/toggleFavourite ", err);
    }
  };
};

export const togglePantry = () => {
  return (dispatch: Dispatch) => {
    dispatch(HANDLE_IS_USER_PANTRY());
  };
};
