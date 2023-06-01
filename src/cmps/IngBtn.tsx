import { Key,useState } from "react"

type IngBtnProps = {
    ingName: string,
    key: Key,
    onHandleIng: (ingName:string,isSelected:boolean) => void
  }
  const IngBtn:React.FC<IngBtnProps> = ({ingName,onHandleIng}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)
    let ingClassName = isSelected? 'selected':'not-selected'

    const handleIng = () =>{
        setIsSelected(!isSelected)
        onHandleIng(ingName,isSelected)
        // if(!isSelected)onHandleIng(ingName)
    }
    
  return (
    <button onClick={()=> handleIng()} className={`ing ${ingClassName}`}>{ingName}</button>
  )
}

export default IngBtn