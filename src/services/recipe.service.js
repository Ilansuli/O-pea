import { storageService } from "./async-storage.service.ts";
import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service";
import Axios from "axios";
import { ingredientService } from "./ingredient.service.ts";

const STORAGE_KEY = "post_db";
const BASE_URL = "https://api.spoonacular.com/recipes";

const API_KEYS = import.meta.env.VITE_RECIPES_API_KEYS?.split(",");
let apiKey = API_KEYS?.find((key) => key !== undefined && key !== null);

export const recipeService = {
  query,
  getById,
  save,
  remove,
  fetchRecipes,
  fetchRecipeInfoById,
  fetchRecipesBySearch,
  addRecipeMsg,
};

async function query(filterBy = { txt: "", price: 0 }) {
  // return httpService.get(STORAGE_KEY, filterBy)
  var recipes = await storageService.query(STORAGE_KEY);
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i");
    recipes = recipes.filter(
      (recipe) => regex.test(recipe.vendor) || regex.test(recipe.description)
    );
  }
  if (filterBy.price) {
    recipes = recipes.filter((recipe) => recipe.price <= filterBy.price);
  }
  return recipes;
}

function getById(recipeId) {
  return storageService.get(STORAGE_KEY, recipeId);
  // return httpService.get(`recipe/${recipeId}`)
}

async function remove(recipeId) {
  await storageService.remove(STORAGE_KEY, recipeId);
  // return httpService.delete(`recipe/${recipeId}`)
}

async function save(recipe) {
  var savedRecipe;
  if (recipe._id) {
    savedRecipe = await storageService.put(STORAGE_KEY, recipe);
    // savedRecipe = await httpService.put(`recipe/${recipe._id}`, recipe)
  } else {
    // Later, owner is set by the backend
    recipe.owner = userService.getLoggedinUser();
    savedRecipe = await storageService.post(STORAGE_KEY, recipe);
    // savedRecipe = await httpService.post('recipe', recipe)
  }
  return savedRecipe;
}

async function addRecipeMsg(recipeId, txt) {
  // const savedMsg = await httpService.post(`recipe/${recipeId}/msg`, {txt})
  return savedMsg;
}

async function fetchRecipes(pantry) {
  if (pantry.length === 0) return [];
  const ingredients = pantry.map((ing) => ing.name);
  try {
    const response = await Axios({
      method: "GET",
      url: `${BASE_URL}/findByIngredients/`,
      params: {
        apiKey,
        ingredients:
          ingredients.join(","),
        number: 100,
      },
    });
    const refRecipes = await _refRecipes(response.data);
    return refRecipes;
  } catch (err) {
    console.log(err, "getRecipesByIng(),recipe.service.js");
  }
}

async function fetchRecipeInfoById(recipeId) {
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

async function fetchRecipesBySearch(query) {
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
    const refRes = await _refSearchRes(response.data);
    return refRes;
  } catch (err) {
    console.log(err, "getRecipesByIng(),recipe.service.js");
  }
}

//Local Functions//

function _refSearchRes(recipes) {
  const refSearchRes = recipes.map((r) => {
    const { id: _id, title: name } = r;
    return { _id, name };
  });
  return refSearchRes;
}

function _refRecipe(r) {
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

function _refRecipes(recipes) {
  const refRecipes = recipes.map((r) => {
    const {
      image: img,
      // dishTypes,
      // diets: labels,
      id: _id,
      // readyInMinutes: time,
      // sourceName: domain,
      // sourceUrl: srcUrl,
      title: name,
      // extendedIngredients: ings,
    } = r;
    return {
      img,
      // dishTypes,
      // labels,
      _id,
      // time,
      // domain,
      // srcUrl,
      name,
      // ings,
    };
  });
  return refRecipes;
}
