import SvgIcon from "./SvgIcon"
import { NavLink } from "react-router-dom";
type MainHeaderProps={
  isPantry:boolean
}

 const MainHeader:React.FC<MainHeaderProps>=({isPantry})=> {
  return (
    <section className="app-header">
      <p>Logo</p>
      {isPantry?<SvgIcon iconName={'threeDots'}/> : 
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