import { useAppDispatch } from "../hooks";
import { setRecipe } from "../store/actions/recipes.action";
import SvgIcon from "./SvgIcon";
import { LazyLoadImage } from "react-lazy-load-image-component";

type RecipePreviewProps = {
    recipe: any
};

const RecipePreview: React.FC<RecipePreviewProps> = ({ recipe }) => {
    const dispatch = useAppDispatch()
    const setCurrRecipe = () => {
        dispatch(setRecipe(recipe))
    }

    return (
        <article onClick={()=>setCurrRecipe()} className="rp">
            <LazyLoadImage
                src={recipe.imgs.REGULAR.url}
                effect='blur'
            />

            <div className="rp-text">
                <header>
                    <h4>{recipe.name}</h4>
                    <SvgIcon iconName={'heart'} className="rp-text-heart" />
                    <a href={recipe.srcUrl} onClick={(e) => e.stopPropagation()} className="rp-text-link">
                        <SvgIcon iconName={'link'} className="link" />
                    </a>
                </header>
                <p className="rp-domain">{recipe.domain}</p>
            </div>
        </article>
    )
}
export default RecipePreview    