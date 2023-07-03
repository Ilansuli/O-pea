import { log } from "console";
import ingredients from "../data/ingredients.json";
import { IngObj } from "../types/ingredient";
// import { httpService } from "./http.service";
export const ingredientService = {
  getIngredients,
  searchIng,
};

function getIngredients(): IngObj[] {
  // return await httpService.get("ingredient");
  return ingredients;
}

function searchIng(searchValue: string) {
  let filteredIngs = getIngredients();
  filteredIngs = filteredIngs
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
    });
  console.log(filteredIngs);

  return filteredIngs;
}
