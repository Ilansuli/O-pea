import { useEffect, useState } from "react"
import { recipeService } from "../services/recipe.service"
import MainHeader from "./MainHeader"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectRecipes } from "../store/reducers/recipes.slice"
import { loadRecipesFromPantry } from "../store/actions/recipes.action"
import { selectLoggedinUser } from "../store/reducers/user.slice"
import { addIngToPantry, removeIngFromPantry } from "../store/actions/user.action"
import IngBtn from "./IngBtn"
import RecipesList from "./RecipesList"

const RecipesIndex: React.FC = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const recipes = useAppSelector(selectRecipes)
  const loggedinUser = useAppSelector(selectLoggedinUser)

  useEffect(() => {
    if (loggedinUser) {
      dispatch(loadRecipesFromPantry(loggedinUser.pantry))
    }
    return () => {
    }
  }, [loggedinUser.pantry])

  return (
    <div className="scroll-placeholder-recipes">
      <main className="recipes-index">
        <MainHeader isPantry={false} />
        <section className="recipes-index-body">
          <div className="list-wrapper">

            {recipes.length ?
              <RecipesList recipes={recipes} />
              :
              <div className="list-wrapper empty-pantry-msg">
                <div className="empty-state-img">
                  <img src='https://res.cloudinary.com/dmmsf57ko/image/upload/v1685632708/cook-book_bsntxb.png' alt="" />
                </div>
                <h4>
                  Add your ingredients to get started
                </h4>
                <h4>
                  Every ingredient you add unlocks more recipes
                </h4>
              </div>
            }
          </div>
        </section>
      </main>
    </div>
  )
}
export default RecipesIndex