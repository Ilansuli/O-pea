
import { storageService } from './async-storage.service.ts'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import Axios from 'axios';
import { ingredientService } from './ingredient.service.ts';

const STORAGE_KEY = 'post_db'
const BASE_URL = 'https://api.spoonacular.com/recipes'

export const recipeService = {
    query,
    getById,
    save,
    remove,
    getEmptyRecipe,
    getRecipesByIng,
    addRecipeMsg,
}
window.cs = recipeService

async function query(filterBy = { txt: '', price: 0 }) {
    // return httpService.get(STORAGE_KEY, filterBy)
    var recipes = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        recipes = recipes.filter(recipe => regex.test(recipe.vendor) || regex.test(recipe.description))
    }
    if (filterBy.price) {
        recipes = recipes.filter(recipe => recipe.price <= filterBy.price)
    }
    return recipes

}
function getById(recipeId) {
    return storageService.get(STORAGE_KEY, recipeId)
    // return httpService.get(`recipe/${recipeId}`)
}

async function remove(recipeId) {
    await storageService.remove(STORAGE_KEY, recipeId)
    // return httpService.delete(`recipe/${recipeId}`)
}
async function save(recipe) {
    var savedRecipe
    if (recipe._id) {
        savedRecipe = await storageService.put(STORAGE_KEY, recipe)
        // savedRecipe = await httpService.put(`recipe/${recipe._id}`, recipe)

    } else {
        // Later, owner is set by the backend
        recipe.owner = userService.getLoggedinUser()
        savedRecipe = await storageService.post(STORAGE_KEY, recipe)
        // savedRecipe = await httpService.post('recipe', recipe)
    }
    return savedRecipe
}

async function addRecipeMsg(recipeId, txt) {
    // const savedMsg = await httpService.post(`recipe/${recipeId}/msg`, {txt})
    return savedMsg
}


function getEmptyRecipe() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

async function getRecipesByIng(ingredients) {
    // Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=bac3b40c9a44410bbb26054fa28bee27&ingredients=${ingredients.join(',')}&number=10`)
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log('Error occurred:', error.message);
    //     });
    try {
        const response = await Axios({
            method: 'GET',
            url: `${BASE_URL}/findByIngredients`,
            params: {
                apiKey: import.meta.env.VITE_RECIPES_API,
                number: 3000,
                ingredients: ingredients.join(',') + ',sugar,salt,pepper,olive oil,canola oil,all-purpose-flour'
            },
        })
        console.log(ingredients.join(',') + 'sugar,salt,pepper,olive oil,canola oil,all-purpose-flour')
        const filteredResponse = response.data.filter(recipe => {
            console.log(recipe.missedIngredientCount)
          return recipe.missedIngredientCount <= 5
        })
        console.log(filteredResponse, 'service')
        return filteredResponse;
    } catch (err) {
        console.log(err, 'getRecipesByIng(),recipe.service.js');
    }
}
