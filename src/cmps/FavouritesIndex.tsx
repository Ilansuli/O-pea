import { useAppDispatch, useAppSelector } from "../hooks";
import { setRecipe } from "../store/actions/recipes.action";
import { toggleFavourite } from "../store/actions/user.action";
import { selectLoggedinUser } from "../store/reducers/user.slice";
import { RecipeObj } from "../types/recipe";
import MainHeader from "./MainHeader";
import RecipesList from "./RecipesList";

type FavouritesIndexProps = {

};

const FavouritesIndex: React.FC<FavouritesIndexProps> = ({ }) => {
    const dispatch = useAppDispatch()
    const onSetCurrRecipe = (recipeId: string) => {
        dispatch(setRecipe(recipeId))
    }
    const onToggleFavourite = (recipe: RecipeObj) => {
        dispatch(toggleFavourite(recipe))
    }
    const favourites = useAppSelector(selectLoggedinUser).favourites
    return (
        <div className="scroll-placeholder col-2">
            <main className="recipes-index">
                <MainHeader isFavourites={true} isPantry={false} />
                <section className="recipes-index-body">
                    <div className="list-wrapper">
                        <h4>You Have {favourites.length} Favourites</h4>
                        <RecipesList recipes={favourites} onSetCurrRecipe={onSetCurrRecipe} onToggleFavourite={onToggleFavourite} />
                    </div>
                </section>
            </main>
        </div>
    );
}
export default FavouritesIndex