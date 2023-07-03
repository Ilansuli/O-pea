import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"

import { IngObj } from "../types/ingredient"
import { RecipeObj } from "../types/recipe"

import { utilService } from "../services/util.service"

import MainHeader from "./MainHeader"
import RecipesList from "./RecipesList"
import KitchenLoader from "./KitchenLoader"
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { selectRecipes } from "../store/reducers/recipe.slice"
import { loadRecipes, setRecipe } from "../store/actions/recipes.action"
import { selectLoggedinUser } from "../store/reducers/user.slice"
import { toggleFavourite } from "../store/actions/user.action"
import RequireAuthModal from "./RequireAuthModal"

const RecipesIndex: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRequireAuth, setIsRequireAuth] = useState(false)
  const dispatch = useAppDispatch()
  const recipes = useAppSelector(selectRecipes)
  const loggedinUser = useAppSelector(selectLoggedinUser)
  const { pantry } = loggedinUser

  const handleLoadRecipes = useCallback(
    utilService.debounce((pantry: IngObj[]) => {
      dispatch(loadRecipes(pantry)).then(() => {
        setIsLoading(false)
      })
    }
      , 1000),
    []
  );

  useEffect(() => {
    if (loggedinUser) {
      const ings = pantry.flatMap(aisle => aisle.ings)
      setIsLoading(true)
      handleLoadRecipes(ings);
    }
    return () => {
    }
  }, [loggedinUser.pantry])

  const onSetCurrRecipe = (recipeId: string): void => {
    dispatch(setRecipe(recipeId))
  }
  const onToggleFavourite = (recipe: RecipeObj): void => {
    loggedinUser._id === "0000"
      ?
      setIsRequireAuth(true)
      :
      dispatch(toggleFavourite(recipe))
  }
  const closeRequireAuthModal = (): void => {
    setIsRequireAuth(false)
  }
  return (
    <>
      <div className="scroll-placeholder col-2">
        <main className="recipes-index">
          <MainHeader isPantry={false} />
          <section className="recipes-index-body">
            <div className="list-wrapper">
              {
                isLoading ?
                  <KitchenLoader />
                  :
                  recipes.length ?
                    <>
                      <h4>You Can Make {recipes.length} recipes</h4>
                      <RecipesList onToggleFavourite={onToggleFavourite} onSetCurrRecipe={onSetCurrRecipe} recipes={recipes} />
                    </>
                    :
                    <div className="list-wrapper empty-pantry-msg">
                      <div className="empty-pantry-msg-img">
                        <LazyLoadImage
                          src={'https://res.cloudinary.com/dmmsf57ko/image/upload/v1685632708/cook-book_bsntxb.png'}
                          width={'100%'}
                          effect={'blur'}
                        />
                      </div>
                      <div className="empty-pantry-msg-txt">
                        <h4>
                          Add your ingredients to get started
                        </h4>
                        <h4>
                          Every ingredient you add unlocks more recipes
                        </h4>
                      </div>
                    </div>
              }
            </div>
          </section>
        </main>
      </div>
      {isRequireAuth &&
        <RequireAuthModal closeRequireAuthModal={closeRequireAuthModal} />
      }

    </>
  )
}
export default RecipesIndex