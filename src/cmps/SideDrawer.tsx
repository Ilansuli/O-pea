import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectCurrRecipe } from "../store/reducers/recipes.slice";
import SvgIcon from "./SvgIcon";
import { setRecipe } from "../store/actions/recipes.action";
type SideDrawerProps = {

};

const SideDrawer: React.FC<SideDrawerProps> = ({ }) => {
    const dispatch = useAppDispatch()
    const recipe = useAppSelector(selectCurrRecipe)
    const closeDrawer = () => {
        dispatch(setRecipe(null))
    }
    if (!recipe) return <div className="d"></div>
    return (
        <>
            <div className="d-container" onClick={closeDrawer} >
            </div >
            <aside className="d opened">
                <main className="d-content">
                    <header className="d-header">
                        <SvgIcon onClick={closeDrawer} iconName={'x'} className={'x-icon'} />
                        <div className="d-header-img-container">
                            <LazyLoadImage src={
                                recipe.imgs.LARGE?.url ||
                                recipe.imgs.REGULAR?.url ||
                                'https://res.cloudinary.com/dmmsf57ko/image/upload/v1685632878/onboarding-bg_lf354f.svg'}
                                effect="blur" />
                        </div>
                    </header>
                    <section className="d-body">
                        <div></div>
                        <div className="d-body-wrapper">
                            <p>hey</p>
                            <p>hey</p>
                            <p>hey</p>
                            <p>hey</p>
                            <p>hey</p>
                        </div>
                    </section>
                </main>
            </aside>
        </>
    );
}
export default SideDrawer

