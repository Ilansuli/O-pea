import { Dispatch } from "@reduxjs/toolkit";

import { IngObj } from "../../types/ingredient";

import { recipeService } from "../../services/recipe.service";
import { SET_RECIPES, SET_CURR_RECIPE } from "../reducers/recipe.slice";

export const loadRecipes = (ings: IngObj[]) => {
  return async (dispatch: Dispatch) => {
    try {
      const recipes = await recipeService.fetchRecipes(ings);
      dispatch(SET_RECIPES(recipes));
    } catch (err) {
      console.log("Can't Load Recipes, loadRecipes/recipes.action.ts", err);
    }
  };
};
export const setRecipe = (recipeId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const recipe =
        recipeId === "-1"
          ? null
          : await recipeService.fetchRecipeInfoById(recipeId);
      dispatch(SET_CURR_RECIPE(recipe));
    } catch (err) {
      console.log("Can't Load Recipe, loadCurrRecipe/recipes.action.ts", err);
    }
  };
};
