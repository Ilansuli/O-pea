import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import { userService } from "../services/user.service";

import SvgIcon from "./SvgIcon";

import { selectLoggedinUser } from "../store/reducers/user.slice";
import { setLoggedinUser } from "../store/actions/user.action";


const MobileFooter: React.FC = ({ }) => {
    const dispatch = useAppDispatch()
    const location = useLocation();
    const currentPath = location.pathname;
    const loggedinUser = useAppSelector(selectLoggedinUser)


    const handleLogout = (): void => {
        userService.logout();
        const guestUser = userService.getGuestUser();
        dispatch(setLoggedinUser(guestUser))
    }

    return (
        <footer className="mobile-footer">

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
            <NavLink to={'/favourites'} className='favourites-nav'>
                <SvgIcon iconName="heart" className={`heart-icon `} />
                <p>
                    Favourites
                </p>
            </NavLink>
            {loggedinUser._id === '0000' ?
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
    );
}
export default MobileFooter