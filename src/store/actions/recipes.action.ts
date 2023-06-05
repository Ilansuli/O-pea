import { Dispatch } from "@reduxjs/toolkit";
import { recipeService } from "../../services/recipe.service";
import { setRecipes } from "../reducers/recipes.slice";
import { IngObj } from "../../types/ingredient";

export const loadRecipesFromPantry = (pantry:IngObj[]) => async (dispatch: Dispatch) => {
  const recipes = await recipeService.getRecipesByIng(pantry);
  dispatch(setRecipes(recipes));
};
