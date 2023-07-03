import { useState, useEffect, Key } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";

import { AisleObj } from "../types/aisle";
import { IngObj } from "../types/ingredient";

import { aisleService } from "../services/aisle.service";
import { utilService } from "../services/util.service";

import MainHeader from "./MainHeader"
import AislePreview from "./AislePreview"

import { selectIsUserPantry, selectLoggedinUser } from "../store/reducers/user.slice";
import { addIngToPantry, removeIngFromPantry } from "../store/actions/user.action";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  const loadAisles = (): void => {
    const aisles: AisleObj[] = aisleService.getAisles()
    setAisles(aisles)
  }
  const handleIng = (ing: IngObj, isIngInPantry: boolean): void => {
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
              pantry.length !== 0 ?
                pantry.map((aisle) => (
                  <AislePreview key={aisle._id} aisle={aisle} isUserPantry={isUserPantry} />
                )
                )
                :
                <div className="list-wrapper empty-pantry-msg">
                  <div className="empty-pantry-msg-img grocery-bag-img">
                    <LazyLoadImage
                      src={'https://res.cloudinary.com/dmmsf57ko/image/upload/v1688332990/groceries-svgrepo-com_1_xgvfjj.png'}
                      width={'100%'}
                      effect={'blur'}
                    />
                  </div>
                  <div className="empty-pantry-msg-txt">
                    <h4>
                      Add ingredients to your pantry
                    </h4>
                    <h4>
                      Every ingredient you add unlocks more recipes
                    </h4>
                    </div>
                </div>
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
