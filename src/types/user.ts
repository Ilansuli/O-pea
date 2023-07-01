import { AisleArr } from "./aisle";
import { RecipeObj } from "./recipe";

export type UserObj = {
  username: string;
  fullname: string;
  password: string;
  imgUrl: string;
  _id?: string;
  pantry: AisleArr;
  favourites: RecipeObj[];
};

export type RefubrishedUserObj = {
  fullname: string;
  imgUrl: string;
  _id: string;
  pantry: AisleArr;
  favourites:RecipeObj[]
};
export type UserCred = {
  username: string;
  password: string;
  fullname?: string;
  imgUrl?: string;
  pantry?: AisleArr;
  favourites?: RecipeObj[];
};
