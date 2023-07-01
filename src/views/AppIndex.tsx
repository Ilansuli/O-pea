import Pantry from "../cmps/Pantry"
import RecipesIndex from "../cmps/RecipesIndex"
import { userService } from "../services/user.service";
import SideDrawer from "../cmps/SideDrawer"

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginSignup from "../cmps/LoginSignup";
import FavouritesIndex from "../cmps/FavouritesIndex";
import Home from "./Home";
import { useWindowSize } from "../hooks";
import MobileFooter from "../cmps/MobileFooter";

const AppIndex: React.FC = () => {
  const [height, width] = useWindowSize()
  return (
    <section >
      <SideDrawer />
      <Router>
        <Routes>
          <Route path='/' element={width <= 1100 ? <Pantry /> : <Home />} />
          <Route path='/recipes' element={<RecipesIndex />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/signup' element={<LoginSignup />} />
          <Route path='/favourites' element={<FavouritesIndex />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
        {width <= 1100 &&
          <MobileFooter />
        }
      </Router>
    </section>
  )
}

export default AppIndex