// import { RootState } from './../store';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IngredientObj } from "../../types/aisle"
// import { ingredientService } from '../../services/ingredient.service';



// export interface IngredientsState {
//     ingredients: IngredientObj[]
// }

// const initialState: IngredientsState = {
//     ingredients: []
// }

// export const ingredientsSlice = createSlice({
//     name: 'ingredients',
//     initialState,
//     reducers: {
//         loadIngs: state => {
//             state.ingredients = ingredientService.getIngredients()
//         },
//         getIngByAisle:(state, action: PayloadAction<string>) =>{

//         }
//     }
// })

// export const { loadIngredients } = ingredientsSlice.actions

// export const selectIngredients = (state: RootState) => state.ingredients.ingredients
// export default ingredientsSlice.reducer