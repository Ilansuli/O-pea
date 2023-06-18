import RecipesIndex from "../cmps/RecipesIndex"
import Pantry from "../cmps/Pantry"
import SideDrawer from "../cmps/SideDrawer"

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginSignup from "../cmps/LoginSignup";
import FavouritesIndex from "../cmps/FavouritesIndex";
const AppIndex: React.FC = () => {
  return (
    <section className="main-layout app-index">
      <SideDrawer />
      <Router>
        <Routes>
          <Route path='/' element={<RecipesIndex />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/signup' element={<LoginSignup />} />
          <Route path='/favourites' element={<FavouritesIndex />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Pantry />
    </section>
  )
}

export default AppIndex