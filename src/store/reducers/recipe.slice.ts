import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { recipeService } from '../../services/recipe.service';
import { Dispatch } from 'react';
import { RecipeObj } from '../../types/recipe';


export interface RecipesState {
    recipes: RecipeObj[]
    currRecipe: RecipeObj | null
}

const initialState: RecipesState = {
    recipes: [],
    currRecipe : null
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
            setRecipes: (state, action) => {
                state.recipes = action.payload;
            },
            setCurrRecipe:(state,action)=>{
                state.currRecipe = action.payload
            }
        }
    })

export const { setRecipes,setCurrRecipe } = recipesSlice.actions

export const selectRecipes = (state: RootState) => state.recipe.recipes
export const selectCurrRecipe = (state: RootState) => state.recipe.currRecipe

export default recipesSlice.reducer