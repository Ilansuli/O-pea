import { setCurrRecipe } from "../store/reducers/recipes.slice";
import { recipeObj } from "../types/recipe";
import RecipePreview from "./RecipePreview";

type RecipesListProps = {
    recipes: any[]
    onSetCurrRecipe: (recipeId: string) => void
    onToggleFavourite:(recipe:recipeObj) => void
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