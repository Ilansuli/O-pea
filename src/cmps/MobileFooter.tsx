import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from 'react'
import { userService } from "../services/user.service";

import SvgIcon from "./SvgIcon";

import { selectLoggedinUser } from "../store/reducers/user.slice";
import { setLoggedinUser } from "../store/actions/user.action";
import { selectCurrRecipe } from "../store/reducers/recipe.slice";
import { setRecipe } from "../store/actions/recipes.action";
import RequireAuthModal from "./RequireAuthModal";


const MobileFooter: React.FC = ({ }) => {
    const [isRequireAuth, setIsRequireAuth] = useState(false)
    const dispatch = useAppDispatch()
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate()
    const loggedinUser = useAppSelector(selectLoggedinUser)
    const currRecipe = useAppSelector(selectCurrRecipe)


    const handleLogout = (): void => {
        userService.logout();
        const guestUser = userService.getGuestUser();
        dispatch(setLoggedinUser(guestUser))
    }
    const closeDrawer = (): void => {
        console.log('hey');
        dispatch(setRecipe('-1'))
    }
    const handleFavourites = () => {
        loggedinUser._id === '0000'
            ?
            setIsRequireAuth(true)
            :
            navigate('/favourites')
    }
    const closeRequireAuthModal = (): void => {
        setIsRequireAuth(false)
    }
    return (
        <>
            <footer className="mobile-footer" onClick={currRecipe && (() => closeDrawer())}>

                <NavLink to={'/'} className='pantry-nav'>
                    <SvgIcon iconName="fridge" className={`fridge-icon `} />
                    <p>
                        Pantry
                    </p>
                </NavLink>
                <NavLink to={'/recipes'} className='recipes-nav'>
                    <SvgIcon iconName="home" className={`home-icon`} />
                    <p>
                        Recipes
                    </p>
                </NavLink>
                <a onClick={() => handleFavourites()} className='favourites-nav'>
                    <SvgIcon iconName="heart" className={`heart-icon `} />
                    <p>
                        Favourites
                    </p>
                </a>
                {
                    loggedinUser._id === '0000' ?
                        <NavLink to={'/login'} className={`login-nav ${currentPath === '/signup' ? 'active' : ''}`}>
                            <SvgIcon iconName="user" className={`user-icon`} />
                            <p>
                                Login
                            </p>
                        </NavLink>
                        :
                        <a className='login-nav' onClick={() => handleLogout()}>
                            <SvgIcon iconName="user" className={`user-icon`} />
                            <p>
                                Logout
                            </p>
                        </a>
                }

            </footer >
            {isRequireAuth &&
                <RequireAuthModal closeRequireAuthModal={closeRequireAuthModal} />
            }
        </>
    );
}
export default MobileFooter