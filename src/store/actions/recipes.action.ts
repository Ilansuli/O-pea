import { Dispatch } from "@reduxjs/toolkit";
import { recipeService } from "../../services/recipe.service";
import { setRecipes,setCurrRecipe } from "../reducers/recipes.slice";
import { IngObj } from "../../types/ingredient";
import { recipeObj } from "../../types/recipe";

export const loadRecipesFromPantry =
  (ings: IngObj[]) => async (dispatch: Dispatch) => {
    const recipes = await recipeService.getRecipesByIng(ings);
    dispatch(setRecipes(recipes));
  };
export const setRecipe =
  (recipe: recipeObj) => async (dispatch: Dispatch) => {
    dispatch(setCurrRecipe(recipe))
  };
