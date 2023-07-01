import { useState, useEffect, Key } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";

import { AisleObj } from "../types/aisle";

import MainHeader from "./MainHeader"
import AislePreview from "./AislePreview"
import { aisleService } from "../services/aisle.service";
import { selectIsUserPantry, selectLoggedinUser } from "../store/reducers/user.slice";
import { addIngToPantry, removeIngFromPantry } from "../store/actions/user.action";
import { IngObj } from "../types/ingredient";
import { utilService } from "../services/util.service";

const Pantry: React.FC = () => {
  const [aisles, setAisles] = useState<AisleObj[]>([])
  const dispatch = useAppDispatch()
  const isUserPantry = useAppSelector(selectIsUserPantry)
  const loggedinUser = useAppSelector(selectLoggedinUser)
  const pantry = loggedinUser.pantry
  useEffect(() => {
    loadAisles()
    return () => {
    }
  }, [])
  const loadAisles = () => {
    const aisles: AisleObj[] = aisleService.getAisles()
    setAisles(aisles)
  }
  const handleIng = (ing: IngObj, isIngInPantry: boolean) => {
    isIngInPantry ? dispatch(removeIngFromPantry(ing)) : utilService.debounce(dispatch(addIngToPantry(ing)), 1000)
  }
  if (aisles.length === 0) return <div>Loading...</div>

  return (
    <div className="scroll-placeholder col-1 ">
      <main className="pantry-index">
        <MainHeader isPantry={true} />
        <section className="pantry-index-body">
          <div className="list-wrapper">
            {isUserPantry ?
              pantry.map((aisle) => (
                <AislePreview key={aisle._id} aisle={aisle} isUserPantry={isUserPantry} />
              ))
              :
              aisles.map((aisle) => (
                <AislePreview onHandleIng={handleIng} key={aisle._id as Key} aisle={aisle} isUserPantry={isUserPantry} />
              ))
            }
          </div>
        </section>
      </main>
    </div >
  );
};

export default Pantry;
