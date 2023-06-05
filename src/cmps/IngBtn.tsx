import { Key,useState } from "react"
import { IngObj } from "../types/ingredient"

type IngBtnProps = {
    ing: IngObj,
    key: Key,
    onHandleIng: (ing:IngObj,isSelected:boolean) => void
  }
  const IngBtn:React.FC<IngBtnProps> = ({ing,onHandleIng}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)
    let ingClassName = isSelected? 'selected':'not-selected'

    const handleIng = () =>{
        setIsSelected(!isSelected)
        onHandleIng(ing,isSelected)
        // if(!isSelected)onHandleIng(ingName)
    }
    
  return (
    <button onClick={()=> handleIng()} className={`ing ${ingClassName}`}>{ing.name}</button>
  )
}

export default IngBtn