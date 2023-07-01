import Pantry from "../cmps/Pantry"
import RecipesIndex from "../cmps/RecipesIndex"

const Home: React.FC = () => {
  return (
    <section className=" home-layout">
      <RecipesIndex />
      <Pantry />
    </section>
  )
}

export default Home