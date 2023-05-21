import { Dispatch } from '@reduxjs/toolkit';
import { recipeService } from "../../services/recipe.service";
import { setRecipes } from "../reducers/recipes.slice";


export const loadRecipesByIng = () => async (dispatch:Dispatch) => {
    const recipes = await recipeService.getRecipesByIng(['butter'])
    dispatch(setRecipes(recipes))
};
