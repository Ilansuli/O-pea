import SvgIcon from "./SvgIcon"
import { NavLink } from "react-router-dom";
import { selectIsUserPantry } from "../store/reducers/user.slice";
import { togglePantry } from "../store/actions/user.action";
import { useAppDispatch, useAppSelector } from "../hooks";
type MainHeaderProps = {
  isPantry: boolean
}

const MainHeader: React.FC<MainHeaderProps> = ({ isPantry }) => {
  const dispatch = useAppDispatch()
  const isUserPantry = useAppSelector(selectIsUserPantry)
  const handleHamburgerClick = () => {
    dispatch(togglePantry())
  }
  return (
    <section className="main-header">
      <p>Logo</p>
      {isPantry ?
        <div>
          {isUserPantry ?
            <h1>My Pantry</h1> :
            <h1>Pantry</h1>
          }
          <SvgIcon onClick={() => handleHamburgerClick()} iconName="menu" className={isUserPantry ? 'active ham hamRotate' : 'ham hamRotate'} />
          <SvgIcon iconName={'threeDots'} className="three-dots-icon" />
        </div>
        :
        <>
          <NavLink to={'/login'}>login</NavLink>
          <NavLink to={'/signup'}>signup</NavLink>
        </>
      }
      <input type="text" />
    </section>
  )
}
export default MainHeader