import { setCurrRecipe } from "../store/reducers/recipe.slice";
import { RecipeObj } from "../types/recipe";
import RecipePreview from "./RecipePreview";

type RecipesListProps = {
    recipes: any[]
    onSetCurrRecipe: (recipeId: string) => void
    onToggleFavourite:(recipe:RecipeObj) => void
};

const RecipesList: React.FC<RecipesListProps> = ({ recipes,onSetCurrRecipe,onToggleFavourite }) => {
    return (
        <>
            <div className="recipes-list">
                {recipes.map(recipe => {
                    return <RecipePreview onToggleFavourite={onToggleFavourite} onSetCurrRecipe={onSetCurrRecipe} key={recipe._id} recipe={recipe} />
                })} </div>
        </>
    );
}
export default RecipesList