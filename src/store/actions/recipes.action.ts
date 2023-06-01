import { Dispatch } from "@reduxjs/toolkit";
import { recipeService } from "../../services/recipe.service";
import { setRecipes } from "../reducers/recipes.slice";

export const loadRecipesFromPantry = (pantry:string[]) => async (dispatch: Dispatch) => {
  const recipes = await recipeService.getRecipesByIng(pantry);
  dispatch(setRecipes(recipes));
};
