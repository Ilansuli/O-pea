import aisles from "../data/aisles.json";
import { AisleObj } from "../types/aisle";


export const aisleService = {
  getAisles,
  getAisleById,
};

function getAisles(): AisleObj[] {
  return aisles;
  // try {
  //   const aisles = await httpService.get("aisle");
  //   return aisles;
  // } catch (err) {
  //   console.log(err);
  // }
}
function getAisleById(aisleId: string): AisleObj {
  const aisles = aisleService.getAisles();
  return aisles.find((aisle) => aisle._id === aisleId);
}
