import { AisleObj } from "../types/aisle"
import { IngObj } from "../types/ingredient"
import ingredients from '../data/ingredients.json'
import { useEffect, useState, Key } from "react"
import IngBtn from "./IngBtn"
import SvgIcon from "./SvgIcon"
type AislePreviewProps = {
  aisle: AisleObj,
  onHandleIng?: (ing: IngObj, isSelected: boolean) => void
  isUserPantry: boolean
}

const AislePreview: React.FC<AislePreviewProps> = ({ aisle, onHandleIng, isUserPantry }) => {
  const [ings, setIngs] = useState<IngObj[]>([])
  const [visibleIngs, setVisibleIngs] = useState(10)
  const visibleIngsList = ings.slice(0, visibleIngs)
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
    <section className={isUserPantry ? "aisle-preview user" : "aisle-preview"}>
      <header>
        <div className="aisle-img-wrap">
          <img src={aisle.imgURL} alt="" />
        </div>
        <h4>{aisle.name}</h4>
        {visibleIngs === 10 ?
          <SvgIcon onClick={() => setVisibleIngs(ings.length)} iconName="arrowDown" className="arrow-down-icon" />
          :
          <SvgIcon onClick={() => setVisibleIngs(10)} iconName="arrowUp" className="arrow-up-icon" />
        }
      </header>
      <main>
        {isUserPantry ?
          (
            aisle.ings.map((ing) => (
              <div key={ing._id} className="ing-preview">
                <p className="ing-preview-name">{ing.name}</p>
                <SvgIcon iconName="search" className="search-icon" />
                <SvgIcon iconName="trash" className="trash-icon" />
              </div>
            ))
          ) :
          (
            <>
              {visibleIngsList.map((ing: IngObj) => (
                <IngBtn onHandleIng={onHandleIng} key={ing._id} ing={ing} />
              ))}
              {visibleIngs < ings.length && (
                <button onClick={() => setVisibleIngs(ings.length)} className="ing not-selected">+{ings.length - visibleIngs} more</button>
              )}
            </>
          )}
      </main>

    </section>
  )
}

export default AislePreview