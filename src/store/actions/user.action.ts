import { Dispatch } from "@reduxjs/toolkit";
import {} from "../reducers/recipes.slice";
import { userService } from "../../services/user.service";
import { UserCred } from "../../types/user";
import {
  addIng,
  handleIsUserPantry,
  removeIng,
  selectLoggedinUser,
  setLoggedinUser,
  setUsers,
} from "../reducers/user.slice";
import { IngObj } from "../../types/ingredient";

export const login = (cred: UserCred) => async (dispatch: Dispatch) => {
  const user = await userService.login(cred);
  dispatch(setLoggedinUser(user));
};
export const signup = (cred: UserCred) => async (dispatch: Dispatch) => {
  const user = await userService.signup(cred);
  dispatch(setLoggedinUser(user));
};
export const loadUsers = () => async (dispatch: Dispatch) => {
  const users = await userService.getUsers();
  dispatch(setUsers(users));
};
export const addIngToPantry = (ing: IngObj) => async (dispatch: Dispatch) => {
  dispatch(addIng(ing));
};
export const removeIngFromPantry =
  (ing: IngObj) => async (dispatch: Dispatch) => {
    dispatch(removeIng(ing));
  };
export const togglePantry = () => async (dispatch: Dispatch) => {
  dispatch(handleIsUserPantry());
};
