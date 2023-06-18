import SvgIcon from "./SvgIcon";

type FoodLoaderProps = {
    
};

const FoodLoader: React.FC<FoodLoaderProps> = ({  }) => {
    return (
        <div className="loader">
            <SvgIcon iconName="x" className={'loader-icon'} />
        </div>
    );
}
export default FoodLoader