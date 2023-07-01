import { MouseEvent } from 'react';
import { useAppSelector } from "../hooks";

import { RecipeObj } from "../types/recipe";

import { LazyLoadImage } from "react-lazy-load-image-component";
import SvgIcon from "./SvgIcon";

import { selectLoggedinUser } from "../store/reducers/user.slice";

type RecipePreviewProps = {
    recipe: RecipeObj
    onSetCurrRecipe: (recipeId: string) => void
    onToggleFavourite: (recipe: RecipeObj) => void
};

const RecipePreview: React.FC<RecipePreviewProps> = ({ recipe, onSetCurrRecipe, onToggleFavourite }) => {
    const favourites = useAppSelector(selectLoggedinUser).favourites
    const isFavourite = favourites.some(r => r._id === recipe._id)
    const handleFavourite = (ev: MouseEvent<HTMLButtonElement>): void => {
        ev.stopPropagation()
        onToggleFavourite(recipe)
    }
    return (
        <article onClick={() => onSetCurrRecipe(recipe._id)} className="rp">
            <div className="rp-img-container">
                <LazyLoadImage
                    src={recipe.img}
                    effect='blur'
                />
            </div>

            <div className="rp-text">
                <header>
                    <h4>{recipe.name}</h4>
                    <SvgIcon onClick={(ev) => handleFavourite(ev)} iconName={'heart'} className={`rp-text-heart ${isFavourite && 'full'}`} />
                </header>
            </div>
        </article>
    )
}
export default RecipePreview    