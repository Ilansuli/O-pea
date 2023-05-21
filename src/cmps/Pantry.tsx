import { useState, useEffect, Key } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";

import { AisleObj } from "../types/aisle";

import MainHeader from "./MainHeader"
import AislePreview from "./AislePreview"
import { aisleService } from "../services/aisle.service";

const Pantry: React.FC = () => {
  const [aisles, setAisles] = useState<AisleObj[]>([])
  useEffect(() => {
    loadAisles()
    return () => {
    }
  }, [])

  const loadAisles = () =>{
    const aisles:AisleObj[] = aisleService.getAisles()
    setAisles(aisles)
  }
  const handleIng = ()=>{
      console.log('pantry OK');
  }

  if (aisles.length === 0) return <div>Loading...</div>

  return (
    <main className="pantry">
      <MainHeader />
      <section className="pantry-body">
        {aisles.map((aisle: AisleObj) => (
          <AislePreview onHandleIng={handleIng} key={aisle._id as Key} aisle={aisle} />
        ))}
      </section>
    </main>
  );
};

export default Pantry;
