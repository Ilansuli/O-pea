import RecipesIndex from "../cmps/RecipesIndex"
import Pantry from "../cmps/Pantry"
import SideDrawer from "../cmps/SideDrawer"

const AppIndex: React.FC = () => {
  return (
    <section className="main-layout app-index">
      <SideDrawer/>
      <RecipesIndex />
      <Pantry />
    </section>
  )
}

export default AppIndex