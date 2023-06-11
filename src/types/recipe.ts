import { IngObj } from "./ingredient";

export type recipeObj = {
  calories: number;
  cuisineType: string[];
  dishType: string[];
  domain: string;
  imgs: _recipeImgs;
  ings: any[];
  labels: string[];
  mealType: string[];
  name: string;
  nutrients: _NutrientObj[]
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

type _NutrientObj = {
  label: string;
  quantity: number;
  unit: string;
};
