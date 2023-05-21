import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { recipeService } from '../../services/recipe.service';
import { Dispatch } from 'react';


export interface RecipesState {
    recipes: any[]
}

const initialState: RecipesState = {
    recipes: []
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
            setRecipes: (state, action) => {
                state.recipes = action.payload;
            },
        }
    })

export const { setRecipes } = recipesSlice.actions

export const selectRecipes = (state: RootState) => state.recipes.recipes
export default recipesSlice.reducer