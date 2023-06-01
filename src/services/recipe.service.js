import { storageService } from "./async-storage.service.ts";
import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service";
import Axios from "axios";
import { ingredientService } from "./ingredient.service.ts";

const STORAGE_KEY = "post_db";
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

export const recipeService = {
  query,
  getById,
  save,
  remove,
  getRecipesByIng,
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

async function getRecipesByIng(ingredients) {
  const appIds = import.meta.env.VITE_RECIPES_APP_IDS?.split(",");
  const app_id = appIds?.find((id) => id !== undefined && id !== null);

  const apiKeys = import.meta.env.VITE_RECIPES_API_KEYS?.split(",");
  const app_key = apiKeys?.find((key) => key !== undefined && key !== null);

  try {
    const response = await Axios(
      // "https://api.edamam.com/api/recipes/v2?type=public&q=garlic%2Cchicken&app_id=f666385e&app_key=2aa3c8eff63c76e3a5281a7d4db74a43"
      {
        method: "GET",
        url: `${BASE_URL}`,
        params: {
          app_key,
          app_id,
          type: "public",
          q:
            ingredients.join(",") ,
        },
      }
    );
    const refRecipes = refubrishRecipes(response);
    console.log(refRecipes);
    return refRecipes;
  } catch (err) {
    console.log(err, "getRecipesByIng(),recipe.service.js");
  }
}

function refubrishRecipes(res) {
  console.log("hey");
  const refRecipes = res.data.hits.map((r) => {
    const {
      calories,
      cuisineType,
      dishType,
      healthLabels: labels,
      ingredients: ings,
      label: name,
      mealType,
      images: imgs,
      totalNutrients: nutrients,
      totalTime: time,
      url: srcUrl,
    } = r.recipe;

    return {
      ..._getEmptyRecipe(),
      calories,
      cuisineType,
      dishType,
      labels,
      ings,
      name,
      mealType,
      imgs,
      nutrients,
      time,
      srcUrl,
      domain: _getDomain(srcUrl),
      _id: utilService.makeId(),
    };
  });
  return refRecipes;
}

//Local Functions//

function _getDomain(url) {
  const regex = /^https?:\/\/(?:www\.)?([^\/]+)/;
  const domain = url.match(regex)[1];
  return domain;
}
function _getEmptyRecipe() {
  return {
    calories: "",
    cuisineType: [],
    dishType: [],
    imgs: [],
    ings: [],
    labels: [],
    name: "",
    mealType: [],
    nutrients: {},
    time: "",
    srcUrl: "",
    domain: "",
    _id: "",
  };
}
