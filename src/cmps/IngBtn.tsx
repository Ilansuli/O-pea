import { Key, useState, useEffect } from "react"
import { IngObj } from "../types/ingredient"
import { useAppSelector } from "../hooks"
import { selectLoggedinUser } from "../store/reducers/user.slice"

type IngBtnProps = {
  ing: IngObj,
  key: Key,
  onHandleIng: (ing: IngObj, isIngInPantry: boolean) => void
}
const IngBtn: React.FC<IngBtnProps> = ({ ing, onHandleIng }) => {
  const [isIngActive, setIsIngActive] = useState<boolean>(false)
  const pantry = useAppSelector(selectLoggedinUser).pantry
  let isIngInPantry = pantry.some(aisle => aisle.ings.some(i => i._id === ing._id))
  let ingClassName = isIngInPantry ? 'selected' : 'not-selected'

  const handleIng = (ing: IngObj, isIngInPantry: boolean) => {
    setIsIngActive(!isIngActive)
    onHandleIng(ing, isIngInPantry)
  }

  return (
    <button onClick={() => handleIng(ing, isIngInPantry)} className={`ing ${ingClassName}`}>{ing.name}</button>
  )
}

export default IngBtn