import { useAppDispatch, useAppSelector } from "../hooks";

import { RecipeObj } from "../types/recipe";

import MainHeader from "./MainHeader";
import RecipesList from "./RecipesList";

import { setRecipe } from "../store/actions/recipes.action";
import { toggleFavourite } from "../store/actions/user.action";
import { selectLoggedinUser } from "../store/reducers/user.slice";
import { LazyLoadImage } from "react-lazy-load-image-component";



const FavouritesIndex: React.FC = ({ }) => {
    const dispatch = useAppDispatch()
    const onSetCurrRecipe = (recipeId: string): void => {
        dispatch(setRecipe(recipeId))
    }
    const onToggleFavourite = (recipe: RecipeObj): void => {
        dispatch(toggleFavourite(recipe))
    }
    const favourites = useAppSelector(selectLoggedinUser).favourites
    return (
        <div className="scroll-placeholder col-2">
            <main className="recipes-index">
                <MainHeader isFavourites={true} isPantry={false} />
                <section className="recipes-index-body">
                    <div className="list-wrapper">
                        {favourites.length > 0 ?
                            <>
                                <h4>You Have {favourites.length} Favourites</h4>
                                <RecipesList recipes={favourites} onSetCurrRecipe={onSetCurrRecipe} onToggleFavourite={onToggleFavourite} />
                            </>
                            :
                            <div className="list-wrapper empty-pantry-msg">
                                <div className="empty-pantry-msg-img">
                                    <LazyLoadImage
                                        src={'https://res.cloudinary.com/dmmsf57ko/image/upload/v1688334971/heart-svgrepo-com_goh0ga.png'}
                                        width={'100%'}
                                        effect={'blur'}
                                    />
                                </div>
                                <div className="empty-pantry-msg-txt">
                                    <h4>
                                        Add your favourite recipes
                                    </h4>
                                    <h4>to enjoy them later</h4>
                                </div>
                            </div>

                        }
                    </div>
                </section>
            </main>
        </div>
    );
}
export default FavouritesIndex