import ingredients from "../data/ingredients.json"
import { IngObj } from "../types/aisle"
export const ingredientService = {
    getIngredients
}

function getIngredients():IngObj[] {
        return ingredients
}
