import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"

import { AisleObj } from "../types/aisle"
import { IngObj } from "../types/ingredient"

import IngBtn from "./IngBtn"
import SvgIcon from "./SvgIcon"

import { selectLoggedinUser } from "../store/reducers/user.slice"
import { removeIngFromPantry } from "../store/actions/user.action"

import { ingredientService } from "../services/ingredient.service"
type AislePreviewProps = {
  aisle: AisleObj,
  onHandleIng?: (ing: IngObj, isSelected: boolean) => void
  isUserPantry: boolean
}
const AislePreview: React.FC<AislePreviewProps> = ({ aisle, onHandleIng, isUserPantry }) => {
  const dispatch = useAppDispatch()
  const [ings, setIngs] = useState<IngObj[]>([])
  const [visibleIngs, setVisibleIngs] = useState(10)
  const visibleIngsList = ings.slice(0, visibleIngs)
  const pantry = useAppSelector(selectLoggedinUser).pantry
  useEffect(() => {
    loadIngredients()
    return () => {
    }
  }, [])

  const loadIngredients = (): void => {
    const ingredients = ingredientService.getIngredients()
    const filteredIngs = ingredients.filter((ing: IngObj) => {
      return ing.aisleId === aisle._id
    })
    setIngs(filteredIngs)
  }

  const countAisleIngsInPantry = (): number | string => {
    let aisleInPantry = pantry.find(a => a._id === aisle._id)
    return aisleInPantry ? aisleInPantry.ings.length : '0'
  }

  return (
    <section className={isUserPantry ? "aisle-preview user" : "aisle-preview"}>

      <header>
        <div className="aisle-img-wrap">
          <img src={aisle.imgURL} alt="" />
        </div>
        <div className="aisle-name-container">
          <h4>{aisle.name}</h4>
          {!isUserPantry && (
            <p>{countAisleIngsInPantry()}/{ings.length} Ingredients</p>
          )}
        </div>
        {!isUserPantry && (
          visibleIngs === 10 ?
            <SvgIcon onClick={() => setVisibleIngs(ings.length)} iconName="arrowDown" className="arrow-down-icon" />
            :
            <SvgIcon onClick={() => setVisibleIngs(10)} iconName="arrowUp" className="arrow-up-icon" />
        )
        }
      </header>

      <main>
        {isUserPantry ?
          (
            aisle.ings.map((ing) => (
              <div key={ing._id} className="ing-preview">
                <p className="ing-preview-name">{ing.name}</p>
                <SvgIcon onClick={() => dispatch(removeIngFromPantry(ing))} iconName="trash" className="trash-icon" />
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