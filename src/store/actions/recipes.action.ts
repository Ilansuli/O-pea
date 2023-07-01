import { Dispatch } from "@reduxjs/toolkit";
import { recipeService } from "../../services/recipe.service";
import { setRecipes, setCurrRecipe } from "../reducers/recipe.slice";
import { IngObj } from "../../types/ingredient";

export const loadRecipes = (ings: IngObj[]) => {
  return async (dispatch: Dispatch) => {
    const recipes = await recipeService.fetchRecipes(ings);
    dispatch(setRecipes(recipes));
  };
};
export const setRecipe = (recipeId: string) => {
  return async (dispatch: Dispatch) => {
    const recipe =
      recipeId === "-1"
        ? null
        : await recipeService.fetchRecipeInfoById(recipeId);
    dispatch(setCurrRecipe(recipe));
  };
};
