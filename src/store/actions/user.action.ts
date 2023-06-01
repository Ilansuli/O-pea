import { Dispatch } from "@reduxjs/toolkit";
import { recipeService } from "../../services/recipe.service";
import {} from "../reducers/recipes.slice";
import { userService } from "../../services/user.service";
import { UserCred } from "../../types/user";
import { addIng, removeIng, selectLoggedinUser, setLoggedinUser, setUsers } from "../reducers/user.slice";
import { useAppSelector } from "../../hooks";

// export const addIngToPantry = (ingName:string) => async (dispatch:Dispatch) => {
//     const recipes = await recipeService.getRecipesByIng(['butter'])
//     dispatch(setRecipes(recipes))
// };

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
export const addIngToPantry =
  (ingName: string) => async (dispatch: Dispatch) => {
    dispatch(addIng(ingName));
  };
export const removeIngFromPantry =
  (ingName: string) => async (dispatch: Dispatch) => {
    dispatch(removeIng(ingName));
  };
