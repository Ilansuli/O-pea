import RecipesIndex from "../cmps/RecipesIndex"
import Pantry from "../cmps/Pantry"

const AppIndex: React.FC = () => {
  return (
    <section className="main-layout app-index">
      <RecipesIndex />
      <Pantry />
    </section>
  )
}

export default AppIndex