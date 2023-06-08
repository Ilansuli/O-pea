import { IngObj } from "./ingredient";

export type recipeObj = {
  calories: number;
  cuisineType: string[];
  dishType: string[];
  domain: string;
  imgs: _recipeImgs;
  ings: IngObj[];
  labels: string[];
  mealType: string[];
  name: string;
  nutrients: {};
  srcUrl: string;
  time: number;
  _id: string;
};
type _recipeImgs = {
  LARGE: { url: string };
  REGULAR: { url: string };
  SMALL: { url: string };
  THUMBNAIL: { url: string };
};
