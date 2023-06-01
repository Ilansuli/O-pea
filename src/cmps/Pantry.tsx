import { useState, useEffect, Key } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";

import { AisleObj } from "../types/aisle";

import MainHeader from "./MainHeader"
import AislePreview from "./AislePreview"
import { aisleService } from "../services/aisle.service";
import { selectLoggedinUser } from "../store/reducers/user.slice";
import { addIngToPantry, removeIngFromPantry } from "../store/actions/user.action";

const Pantry: React.FC = () => {
  const [aisles, setAisles] = useState<AisleObj[]>([])
  const dispatch = useAppDispatch()
  const loggedinUser = useAppSelector(selectLoggedinUser)
  useEffect(() => {
    loadAisles()
    if (loggedinUser) console.log(loggedinUser.pantry)
    return () => {
    }
  }, [])

  const loadAisles = () => {
    const aisles: AisleObj[] = aisleService.getAisles()
    setAisles(aisles)
  }
  const handleIng = (ingName: string, isSelected: boolean) => {
    isSelected ? dispatch(removeIngFromPantry(ingName)) : dispatch(addIngToPantry(ingName))
    console.log(ingName);

  }
  if (aisles.length === 0) return <div>Loading...</div>

  return (
    <div className="scroll-placeholder-pantry ">
      <main className="pantry-index">
        <MainHeader isPantry={true} />
        <section className="pantry-index-body">
          <div className="list-wrapper">
          {aisles.map((aisle: AisleObj) => (
            <AislePreview onHandleIng={handleIng} key={aisle._id as Key} aisle={aisle} />
            ))}
            </div>
        </section>
      </main>
    </div>
  );
};

export default Pantry;
