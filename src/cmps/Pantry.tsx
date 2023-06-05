import { useState, useEffect, Key } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";

import { AisleObj } from "../types/aisle";

import MainHeader from "./MainHeader"
import AislePreview from "./AislePreview"
import { aisleService } from "../services/aisle.service";
import { selectIsUserPantry, selectLoggedinUser } from "../store/reducers/user.slice";
import { addIngToPantry, removeIngFromPantry } from "../store/actions/user.action";
import { IngObj } from "../types/ingredient";

const Pantry: React.FC = () => {
  const [aisles, setAisles] = useState<AisleObj[]>([])
  const dispatch = useAppDispatch()
  const isUserPantry = useAppSelector(selectIsUserPantry)
  const loggedinUser = useAppSelector(selectLoggedinUser)
  const pantry = loggedinUser.pantry
  useEffect(() => {
    loadAisles()

    if (loggedinUser) console.log(loggedinUser)
    return () => {
    }
  }, [])

  const loadAisles = () => {
    const aisles: AisleObj[] = aisleService.getAisles()
    setAisles(aisles)
  }
  const handleIng = (ing: IngObj, isSelected: boolean) => {
    isSelected ? dispatch(removeIngFromPantry(ing)) : dispatch(addIngToPantry(ing))
  }
  if (aisles.length === 0) return <div>Loading...</div>

  return (
    <div className="scroll-placeholder-pantry ">
      <main className="pantry-index">
        <MainHeader isPantry={true} />
        <section className="pantry-index-body">
          <div className="list-wrapper">
            {isUserPantry ?
              pantry.map((aisle) => (
                <div key={aisle.name}>
                  <h4>{aisle.name}</h4>
                  {aisle.ings.map(ing => (
                    <p key={ing.aisleId}>{ing.name}</p>
                  ))}
                </div>
              ))
              :
              aisles.map((aisle: AisleObj) => (
                <AislePreview onHandleIng={handleIng} key={aisle._id as Key} aisle={aisle} />
              ))
            }
          </div>
        </section>
      </main>
    </div >
  );
};

export default Pantry;
