import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { recipeService } from '../../services/recipe.service';
import { Dispatch } from 'react';
import { recipeObj } from '../../types/recipe';


export interface RecipesState {
    recipes: recipeObj[]
    currRecipe: recipeObj | null
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

export const selectRecipes = (state: RootState) => state.recipes.recipes
export const selectCurrRecipe = (state: RootState) => state.recipes.currRecipe

export default recipesSlice.reducer