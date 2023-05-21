import { useEffect, useState } from "react"
import { recipeService } from "../services/recipe.service"
import MainHeader  from "./MainHeader"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectRecipes } from "../store/reducers/recipes.slice"
import { loadRecipesByIng } from "../store/actions/recipes.action"
const RecipesIndex: React.FC = () => {
  const dispatch = useAppDispatch()
  const recipes = useAppSelector(selectRecipes)

  useEffect(() => {
    dispatch(loadRecipesByIng())
    return () => {
    }
  }, [dispatch])

  // const fetchRecipesByIng = async  () => {
  //   try {
  //     const recipes = loadRecipesByIng();
  //     console.log(recipes);
      
  //   } catch (err) {
  //     console.log(err, 'fetchRecipes, AppIndex');

  //   }
  // }
  if (!recipes) return <div>Loading...</div>
  console.log(recipes);
  
  return (
    <section className="recipes-index">
      <MainHeader />
      <div className="recipes-index-body">
        {recipes.map(recipe => {
          return <p key={recipe.id}>{recipe.title}</p>
        })}
      </div>
    </section>
  )
}
export default RecipesIndex