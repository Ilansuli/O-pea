import { AisleArr } from "./aisle";
import { IngObj } from "./ingredient";

export type UserObj = {
  username: string;
  fullname: string;
  password: string;
  imgUrl: string;
  _id?: string;
  pantry: AisleArr;
};
export type RefubrishedUserObj = {
  fullname: string;
  imgUrl: string;
  _id: string;
  pantry: AisleArr;
};
export type UserCred = {
  username: string;
  password: string;
  fullname?: string;
  imgUrl?: string;
  pantry?: AisleArr;
};
