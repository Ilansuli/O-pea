import SvgIcon from "./SvgIcon";

type RecipePreviewProps = {
    recipe: any
};

const RecipePreview: React.FC<RecipePreviewProps> = ({ recipe }) => {


    return (
        <article className="rp">
            <div className="rp-img">
                <img src={recipe.imgs.REGULAR.url} alt="" />
            </div>
            <div className="rp-text">
                <header>
                    <h4>{recipe.name}</h4>
                    <SvgIcon iconName={'heart'} className="rp-text-heart" />
                    <a href={recipe.srcUrl} className="rp-text-link">
                    <SvgIcon iconName={'link'} className="link" />
                    </a>
                </header>
                <p className="rp-domain">{recipe.domain}</p>
            </div>
        </article>
    )
}
export default RecipePreview    