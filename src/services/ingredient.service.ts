import ingredients from "../data/ingredients.json"
import { IngObj } from "../types/ingredient"
export const ingredientService = {
    getIngredients,
    searchIng
}

function getIngredients():IngObj[] {
        return ingredients
}

function searchIng(searchValue:string){
    const filteredIngs = getIngredients()
    .filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    //Getting most exact match
    .sort((a, b) => {
        const aLower = a.name.toLowerCase();
        const bLower = b.name.toLowerCase();
        const exactMatchA = aLower === searchValue.toLowerCase();
        const exactMatchB = bLower === searchValue.toLowerCase();

        if (exactMatchA && exactMatchB) {
            // If both ingredients are an exact match, maintain the original order
            return 0;
        } else if (exactMatchA) {
            // If ingredient A is an exact match, prioritize it before ingredient B
            return -1;
        } else if (exactMatchB) {
            // If ingredient B is an exact match, prioritize it before ingredient A
            return 1;
        } else {
            // If neither ingredient is an exact match, maintain the original order
            return 0;
        }
    })
    return filteredIngs
}