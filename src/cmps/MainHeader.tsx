import SvgIcon from "./SvgIcon"
import { selectIsUserPantry, selectLoggedinUser } from "../store/reducers/user.slice";
import { clearPantry, togglePantry, setLoggedinUser } from "../store/actions/user.action";
import { useAppDispatch, useAppSelector, useClickOutside } from "../hooks";
import { useState, useRef } from 'react'
import SearchInput from "./SearchInput";
import { selectRecipes } from "../store/reducers/recipe.slice";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userService } from "../services/user.service";
type MainHeaderProps = {
  isPantry: boolean
  isFavourites?: boolean
}

const MainHeader: React.FC<MainHeaderProps> = ({ isPantry, isFavourites }) => {
  const [isPantryMenu, setIsPantryMenu] = useState<boolean>(false)
  const [isUserMenu, setIsUserMenu] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const loggedinUser = useAppSelector(selectLoggedinUser)
  const pantry = loggedinUser.pantry
  const recipes = useAppSelector(selectRecipes)
  const ings = pantry.flatMap(aisle => aisle.ings)
  const isUserPantry = useAppSelector(selectIsUserPantry)
  const pantryMenuRef = useClickOutside(() => setIsPantryMenu(false));
  const userMenuRef = useClickOutside(() => setIsUserMenu(false));

  const handleHamburgerClick = () => {
    dispatch(togglePantry())
  }
  const clearOutPantry = () => {
    dispatch(clearPantry())
    setIsPantryMenu(false)
  }
  const handleLogout = () => {
    setIsUserMenu(false)
    userService.logout();
    const guestUser = userService.getGuestUser();
    dispatch(setLoggedinUser(guestUser))
  }
  return (
    <section className="main-header">
      {isPantry ?
        <header className="pantry-header">
          <SvgIcon onClick={() => handleHamburgerClick()} iconName="menu" className={isUserPantry ? 'active ham hamRotate' : 'ham hamRotate'} />
          <div className="pantry-header-title-container">
            {
              isUserPantry ?
                <h1 >My Pantry</h1> :
                <h1>Pantry</h1>
            }
            <p>You have {ings.length} Ingredients</p>
          </div>
          <div className="pantry-menu" ref={pantryMenuRef}>
            <SvgIcon iconName={'threeDots'} className="three-dots-icon" onClick={() => setIsPantryMenu(!isPantryMenu)} />
            {isPantryMenu && (
              <ul className='pantry-menu-modal'>
                <li onClick={() => clearOutPantry()}>
                  <SvgIcon className={'trash-icon'} iconName="trash" />
                  <p>
                    Remove All Ingredients
                  </p>
                </li>
              </ul>
            )}
          </div>
        </header>
        :
        <header className="recipes-header">

          <section className="recipes-header-title-container">
            <h1>O-pea</h1>
            <p className={recipes.length > 0 ? '' : 'non-visible'}>You can make {recipes.length} recipes</p>
          </section>

          {loggedinUser._id === '0000' ?
            <section className="recipes-header-auth">
              <NavLink className={'login-nav'} to={'/login'}>Login</NavLink>
              <NavLink className={'signup-nav'} to={'/signup'}>Signup</NavLink>
            </section>
            :
            <section className="recipes-header-loggedin">
              <NavLink className={'favourites-nav'} to={'/favourites'}><SvgIcon iconName="heart" className={"favourites-nav-heart-icon"} /></NavLink>
              <div className="user-menu" ref={userMenuRef} >
                <SvgIcon iconName="user" className={'user-icon'} onClick={() => setIsUserMenu(true)} />
                {isUserMenu && (
                  <ul className='user-menu-modal'>
                    <li onClick={() => handleLogout()}>
                      <p>
                        Logout
                      </p>
                    </li>
                  </ul>
                )
                }
              </div>
            </section>
          }
          {isFavourites && (
            <section className="recipes-header-back">
              <NavLink to={'/'}>
                <SvgIcon iconName="arrowLeft" className={'favourites-arrow-left-icon'} />
              </NavLink>
            </section>
          )}
        </header>
      }
      <SearchInput isPantry={isPantry} />
    </section>
  )
}
export default MainHeader