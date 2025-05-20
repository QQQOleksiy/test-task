// API Response structure
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    filterType?: string;
    count?: number;
}

// Ingredient structure for formatted recipe response
export interface Ingredient {
    name: string;
    measure: string;
}

// Full recipe data structure from TheMealDB API
export interface RawRecipeData {
    idMeal: string;
    strMeal: string;
    strMealAlternate: string | null;
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string | null;
    strMealThumb: string | null;
    strTags: string | null;
    strYoutube: string | null;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
    // Dynamic ingredient and measure properties
    [key: string]: string | null;
}

// RecipeTypes summary structure for list responses
export interface RecipeSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string | null;
}

// Full recipe with formatted ingredients
export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory?: string | null;
    strArea?: string | null;
    strInstructions?: string | null;
    strMealThumb?: string | null;
    strTags?: string | null;
    strYoutube?: string | null;
    ingredients?: Ingredient[];
}

// TheMealDB API response structure for recipe lists
export interface MealDbListResponse {
    meals: RecipeSummary[] | null;
}

// TheMealDB API response structure for recipe details
export interface MealDbDetailResponse {
    meals: RawRecipeData[] | null;
}

// Filter types for recipe queries
export type FilterType = "ingredient" | "country" | "category" | "all";
