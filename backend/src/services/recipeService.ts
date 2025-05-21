import axios from 'axios';
import { 
    Recipe, 
    RecipeSummary, 
    Ingredient, 
    MealDbListResponse, 
    MealDbDetailResponse, 
    RawRecipeData 
} from '../types';
import { apiUrls } from '../constants/api';

export class RecipeService {
    static async getAllRecipes(): Promise<RecipeSummary[]> {
        try {
            const response = await axios.get<MealDbListResponse>(apiUrls.allRecipes());
            return response.data.meals || [];
        } catch (error) {
            console.error('Error getting all recipes:', error);
            throw new Error('Failed to retrieve recipes list');
        }
    }

    static async getRecipesByIngredient(ingredient: string): Promise<RecipeSummary[]> {
        try {
            const response = await axios.get<MealDbListResponse>(apiUrls.recipesByIngredient(ingredient));
            return response.data.meals || [];
        } catch (error) {
            console.error(`Error getting recipes by ingredient ${ingredient}:`, error);
            throw new Error(`Failed to retrieve recipes for ingredient ${ingredient}`);
        }
    }

    static async getRecipesByCountry(country: string): Promise<RecipeSummary[]> {
        try {
            const response = await axios.get<MealDbListResponse>(apiUrls.recipesByCountry(country));
            return response.data.meals || [];
        } catch (error) {
            console.error(`Error getting recipes by country ${country}:`, error);
            throw new Error(`Failed to retrieve recipes for country ${country}`);
        }
    }

    static async getRecipesByCategory(category: string): Promise<RecipeSummary[]> {
        try {
            const response = await axios.get<MealDbListResponse>(apiUrls.recipesByCategory(category));
            return response.data.meals || [];
        } catch (error) {
            console.error(`Error getting recipes by category ${category}:`, error);
            throw new Error(`Failed to retrieve recipes for category ${category}`);
        }
    }

    static async getRecipeById(id: string): Promise<Recipe> {
        try {
            const response = await axios.get<MealDbDetailResponse>(apiUrls.recipeById(id));
            
            if (!response.data.meals || response.data.meals.length === 0) {
                throw new Error(`Recipe with ID ${id} not found`);
            }
            
            const mealData: RawRecipeData = response.data.meals[0];

            const ingredients: Ingredient[] = [];

            for (let i = 1; i <= 20; i++) {
                const ingredientKey = `strIngredient${i}` as keyof RawRecipeData;
                const measureKey = `strMeasure${i}` as keyof RawRecipeData;

                const ingredientName = mealData[ingredientKey];
                const ingredientMeasure = mealData[measureKey];

                if (typeof ingredientName === 'string' && ingredientName.trim() !== '') {
                    ingredients.push({
                        name: ingredientName.trim(),
                        measure: (typeof ingredientMeasure === 'string' ? ingredientMeasure.trim() : '')
                    });
                }
            }

            const recipe: Recipe = {
                idMeal: mealData.idMeal,
                strMeal: mealData.strMeal,
                strCategory: mealData.strCategory,
                strArea: mealData.strArea,
                strInstructions: mealData.strInstructions,
                strMealThumb: mealData.strMealThumb,
                strTags: mealData.strTags,
                strYoutube: mealData.strYoutube,
                ingredients
            };
            
            return recipe;
        } catch (error) {
            console.error(`Error getting recipe with ID ${id}:`, error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(`Failed to retrieve recipe with ID ${id}`);
        }
    }
}
