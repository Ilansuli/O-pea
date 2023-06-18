import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectCurrRecipe, selectRecipes } from "../store/reducers/recipes.slice";
import SvgIcon from "./SvgIcon";
import { setRecipe } from "../store/actions/recipes.action";
import RecipePreview from "./RecipePreview";
import { useRef, useState } from 'react'
import KitchenLoader from "./KitchenLoader";
import { selectLoggedinUser } from "../store/reducers/user.slice";
import { recipeObj } from "../types/recipe";
import { toggleFavourite } from "../store/actions/user.action";
const SideDrawer: React.FC = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const recipe = useAppSelector(selectCurrRecipe)
    const recipes = useAppSelector(selectRecipes)
    const favourites = useAppSelector(selectLoggedinUser).favourites
    const isFavourite = recipe ? favourites.some(r => r._id === recipe._id) : false
    const drawerRef = useRef<HTMLDivElement>(null);

    const closeDrawer = () => {
        dispatch(setRecipe('-1'))
    }
    const onSetCurrRecipe = (recipeId: string) => {
        setIsLoading(true)
        if (drawerRef.current) {
            drawerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        dispatch(setRecipe(recipeId)).then(() => setIsLoading(false))
    }
    const onToggleFavourite = (recipe: recipeObj) => {
        dispatch(toggleFavourite(recipe))
    }
    if (!recipe) return <div className="d"></div>
    return (
        <>
            <div className="d-container" onClick={closeDrawer} >
            </div >
            <aside className="d opened" ref={drawerRef}>
                <main className="d-content">
                    <header className="d-header">
                        <SvgIcon onClick={closeDrawer} iconName={'x'} className={'x-icon'} />
                        {isLoading ?
                            <KitchenLoader />
                            :
                            <div className="d-header-img-container">
                                <LazyLoadImage src={
                                    recipe.img ||
                                    'https://res.cloudinary.com/dmmsf57ko/image/upload/v1685632878/onboarding-bg_lf354f.svg'}
                                    effect="blur" />
                            </div>
                        }
                    </header>
                    <section className="d-body">
                        <div className="d-body-floating-details">
                            <header>
                                <div>
                                    <h4>
                                        {recipe.name}
                                    </h4>
                                    <SvgIcon iconName="heart" className={`d-heart-icon ${isFavourite && 'full'}`} />
                                </div>
                                <p>{recipe.ings.length} Ingredients</p>
                            </header>
                            <footer>
                                <SvgIcon iconName="clock" className="d-clock-icon" />
                                <p>{recipe.time} mins</p>
                            </footer>
                        </div>
                        <main className="d-body-main">
                            <div>
                                <h4>Ingredients</h4>
                                {recipe.ings.map(ing =>
                                    <div key={ing.id} className="d-body-main-ing">
                                        <h4>{ing.original}</h4>
                                    </div>
                                )}
                                <div className="domain-btn">
                                    <a href={recipe.srcUrl} >
                                        <h4>View Full Recipe</h4>
                                        <p>{recipe.domain}</p>
                                    </a>
                                </div>
                            </div>
                            {/* <div className="nutrition-details">
                                <>
                                    <h4 className="nutrition-details-title">Nutrition Facts</h4>
                            
                                    {recipe.nutrients.map(n =>
                                        <article key={n.quantity} className="nutrition">
                                            <h4 className="nutrition-title">{n.label}</h4>
                                            <p className="nutrition-value">{n.quantity} {n.unit}</p>
                                        </article>
                                    )}
                                </>
                            </div> */}
                        </main>
                        {recipes.length > 0 &&
                            <footer className="d-footer">
                                <h4 className="d-footer-title">You might also like</h4>
                                {recipes.map(recipe => {
                                    return <RecipePreview onToggleFavourite={onToggleFavourite} onSetCurrRecipe={onSetCurrRecipe} key={recipe._id} recipe={recipe} />
                                })}
                            </footer>
                        }
                    </section>
                </main>
            </aside>
        </>
    );
}
export default SideDrawer

