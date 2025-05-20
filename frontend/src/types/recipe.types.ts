export interface IIngredient {
  name: string;
  measure: string;
}

export interface IRecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
}

export interface IRecipeTypes {
  idMeal: string;
  strMeal: string;
  strCategory?: string | null;
  strArea?: string | null;
  strInstructions?: string | null;
  strMealThumb?: string | null;
  strTags?: string | null;
  strYoutube?: string | null;
  ingredients?: IIngredient[];
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  filterType?: string;
  count?: number;
}

export type FilterType = "ingredient" | "country" | "category" | "all";
