import aisles from "../data/aisles.json"
import { AisleObj } from "../types/aisle"

export const aisleService = {
    getAisles
}

function getAisles():AisleObj[] {
        return aisles
}
