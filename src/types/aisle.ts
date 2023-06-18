import { IngObj } from "./ingredient";

export type AisleArr = AisleObj[];

export type AisleObj = {
    name?:string
    imgURL?:string
    ings?: IngObj[]
    _id?:string

}