
export type RecipeObj = {
  dishTypes?: string[];
  domain?: string;
  img?:string
  ings?: any[];
  labels?: string[];
  name: string;
  srcUrl?: string;
  time?: number;
  _id: string;
};
// type _recipeImgs = {
//   LARGE: { url: string };
//   REGULAR: { url: string };
//   SMALL: { url: string };
//   THUMBNAIL: { url: string };
// };

type _NutrientObj = {
  label: string;
  quantity: number;
  unit: string;
};
