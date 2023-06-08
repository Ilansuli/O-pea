import { useEffect, useState } from "react"
import MainHeader from "./MainHeader"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectRecipes } from "../store/reducers/recipes.slice"
import { loadRecipesFromPantry } from "../store/actions/recipes.action"
import { selectLoggedinUser } from "../store/reducers/user.slice"
import RecipesList from "./RecipesList"
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RecipesIndex: React.FC = () => {
  const dispatch = useAppDispatch()
  const recipes = useAppSelector(selectRecipes)
  const loggedinUser = useAppSelector(selectLoggedinUser)

  useEffect(() => {
    if (loggedinUser) {
      const ings = loggedinUser.pantry.flatMap(aisle => aisle.ings)
      console.log(ings);

      dispatch(loadRecipesFromPantry(ings))
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
                  <LazyLoadImage
                    src={'https://res.cloudinary.com/dmmsf57ko/image/upload/v1685632708/cook-book_bsntxb.png'}
                    width={'100%'}
                    effect={'blur'}
                  />
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