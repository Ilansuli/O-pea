import { createSlice } from "@reduxjs/toolkit";

import { RecipeObj } from "../../types/recipe";

import { RootState } from "../store";

export interface RecipesState {
  recipes: RecipeObj[];
  currRecipe: RecipeObj | null;
}

const initialState: RecipesState = {
  recipes: [],
  currRecipe: null,
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    SET_RECIPES: (state, action) => {
      state.recipes = action.payload;
    },
    SET_CURR_RECIPE: (state, action) => {
      state.currRecipe = action.payload;
    },
  },
});

export const { SET_RECIPES, SET_CURR_RECIPE } = recipesSlice.actions;

export const selectRecipes = (state: RootState) => state.recipe.recipes;
export const selectCurrRecipe = (state: RootState) => state.recipe.currRecipe;

export default recipesSlice;
