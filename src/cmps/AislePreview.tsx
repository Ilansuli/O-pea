import { AisleObj} from "../types/aisle"
import { IngObj } from "../types/ingredient"
import ingredients from '../data/ingredients.json'
import { useEffect, useState,Key } from "react"
import IngBtn from "./IngBtn"
type AislePreviewProps = {
  aisle: AisleObj,
  onHandleIng: (ing:IngObj,isSelected:boolean) => void
}

const AislePreview: React.FC<AislePreviewProps> = ({ aisle,onHandleIng }) => {
  const [ings, setIngs] = useState<IngObj[] | []>([])
  useEffect(() => {
    loadIngredients()
    return () => {
    }
  }, [])

  
  const loadIngredients = () => {
    
    const filteredIngs = ingredients.filter((ing: IngObj) => {
     return ing.aisleId === aisle._id
    })
    setIngs(filteredIngs)
  }
  return (
    <section className="aisle-preview">
      <header>
        <div className="aisle-img-wrap">
          <img src={aisle.imgURL} alt="" />
        </div>
        <h4>{aisle.name}</h4>
      </header>
      <main>
        {ings.map((ing: IngObj) => (
          <IngBtn onHandleIng={onHandleIng} key={ing._id as Key} ing={ing}/>
        ))}
      </main>
    </section>
  )
}

export default AislePreview