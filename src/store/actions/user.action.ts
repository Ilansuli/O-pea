import { Dispatch } from "@reduxjs/toolkit";
import {} from "../reducers/recipes.slice";
import { userService } from "../../services/user.service";
import { UserCred } from "../../types/user";
import {
  addIng,
  clearOutPantry,
  handleIsUserPantry,
  removeIng,
  setLoggedinUser,
  setUsers,
  toggleFavouriteRecipe,
} from "../reducers/user.slice";
import { IngObj } from "../../types/ingredient";
import { recipeObj } from "../../types/recipe";

export const login = (cred: UserCred) => async (dispatch: Dispatch) => {
  const user = await userService.login(cred);
  if (!user) return user;
  else {
    dispatch(setLoggedinUser(user));
    return true;
  }
};
export const signup = (cred: UserCred) => async (dispatch: Dispatch) => {
  const user = await userService.signup(cred);
  dispatch(setLoggedinUser(user));
};
export const logout = () => async (dispatch: Dispatch) => {
  console.log("logout strore");

  userService.logout();
  dispatch(setLoggedinUser(userService.getGuestUser()));
};

export const loadUsers = () => async (dispatch: Dispatch) => {
  const users = await userService.getUsers();
  dispatch(setUsers(users));
};
export const addIngToPantry = (ing: IngObj) => async (dispatch: Dispatch) => {
  const debounceTimer = setTimeout(() => {
    dispatch(addIng(ing));
  }, 1000);
  return () => {
    clearTimeout(debounceTimer);
  };
};
export const removeIngFromPantry =
  (ing: IngObj) => async (dispatch: Dispatch) => {
    dispatch(removeIng(ing));
  };
export const clearPantry = () => async (dispatch: Dispatch) => {
  dispatch(clearOutPantry());
};
export const toggleFavourite = (recipe: recipeObj) => (dispatch: Dispatch) => {
  dispatch(toggleFavouriteRecipe(recipe));
};
export const togglePantry = () => async (dispatch: Dispatch) => {
  dispatch(handleIsUserPantry());
};
export const loadUser = () => async (dispatch: Dispatch) => {
  const loggedinUser = await userService.getLoggedinUser();
  !loggedinUser
    ? dispatch(setLoggedinUser(userService.getGuestUser()))
    : dispatch(setLoggedinUser(loggedinUser));
};
