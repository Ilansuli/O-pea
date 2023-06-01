import RecipePreview from "./RecipePreview";

type RecipesListProps = {
    recipes:any[]
};

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
    return (
        <>
        <h2>You Can Make {recipes.length} recipes</h2>
        <div className="recipes-list">
        {recipes.map(recipe => {
            return <RecipePreview key={recipe._id} recipe={recipe}/>
        })} </div>
        </>
    );
}
export default RecipesList