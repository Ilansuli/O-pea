import { IngObj } from "../types/ingredient";
import { RecipeObj } from "../types/recipe";
import { storageService } from "./async-storage.service";
import { userService } from "./user.service";
import Axios from "axios";

const STORAGE_KEY = "post_db";
const BASE_URL = "https://api.spoonacular.com/recipes";

const API_KEYS: string[] = import.meta.env.VITE_RECIPES_API_KEYS?.split(",");
let apiKey: string = API_KEYS?.find(
  (key: string) => key !== undefined && key !== null
);

export const recipeService = {
  fetchRecipes,
  fetchRecipeInfoById,
  fetchRecipesBySearch,
};

async function fetchRecipes(pantry: IngObj[]): Promise<RecipeObj[] | []> {
  if (pantry.length === 0) return [];
  const ingredients = pantry.map((ing) => ing.name);
  try {
    const response = await Axios({
      method: "GET",
      url: `${BASE_URL}/findByIngredients/`,
      params: {
        apiKey,
        ingredients: ingredients.join(","),
        number: 100,
      },
    });
    const refRecipes = await _refRecipes(response.data);
    return refRecipes;
  } catch (err) {
    console.log(err, "getRecipesByIng(),recipe.service.js");
  }
}

async function fetchRecipeInfoById(recipeId: string): Promise<RecipeObj> {
  try {
    const response = await Axios({
      method: "GET",
      url: `${BASE_URL}/${recipeId}/information`,
      params: {
        apiKey,
      },
    });
    const refRecipe = _refRecipe(response.data);

    return refRecipe;
  } catch (err) {
    console.log(err, "getRecipesInfo(),recipe.service.js");
  }
}

async function fetchRecipesBySearch(query: string): Promise<RecipeObj[]> {
  // GET https://api.spoonacular.com/recipes/autocomplete?number=10&query=chick&apiKey
  try {
    const response = await Axios({
      method: "GET",
      url: `${BASE_URL}/autocomplete`,
      params: {
        apiKey,
        number: 6,
        query,
      },
    });
    const refRes = _refSearchRes(response.data);
    return refRes;
  } catch (err) {
    console.log(err, "getRecipesByIng(),recipe.service.js");
  }
}

//Local Functions//

function _refSearchRes(recipes: any[]): { _id: string; name: string }[] {
  const refSearchRes = recipes.map((r) => {
    const { id: _id, title: name } = r;
    return { _id, name };
  });
  return refSearchRes;
}

function _refRecipe(r: any): RecipeObj {
  const {
    image: img,
    dishTypes,
    diets: labels,
    id: _id,
    readyInMinutes: time,
    sourceName: domain,
    sourceUrl: srcUrl,
    title: name,
    extendedIngredients: ings,
  } = r;
  return {
    img,
    dishTypes,
    labels,
    _id,
    time,
    domain,
    srcUrl,
    name,
    ings,
  };
}

function _refRecipes(recipes: any[]): RecipeObj[] {
  const refRecipes = recipes.map((r) => {
    const { image: img, id: _id, title: name } = r;
    return {
      img,
      _id,
      name,
    };
  });
  return refRecipes;
}
