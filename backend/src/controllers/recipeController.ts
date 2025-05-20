import { Request, Response } from 'express';
import { RecipeService } from '../services/recipeService';

export const recipeController = {
    async getRecipes(req: Request, res: Response): Promise<void> {
        try {
            const { ingredient, country, category } = req.query;
            
            let recipes;
            let filterType = '';
            
            if (ingredient) {
                recipes = await RecipeService.getRecipesByIngredient(ingredient as string);
                filterType = `ingredient:${ingredient}`;
            } else if (country) {
                recipes = await RecipeService.getRecipesByCountry(country as string);
                filterType = `country:${country}`;
            } else if (category) {
                recipes = await RecipeService.getRecipesByCategory(category as string);
                filterType = `category:${category}`;
            } else {
                recipes = await RecipeService.getAllRecipes();
                filterType = 'all';
            }
            
            res.json({
                success: true,
                filterType,
                count: recipes.length,
                data: recipes
            });
        } catch (error) {
            console.error('Error getting recipes:', error);
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Error retrieving recipes'
            });
        }
    },
    
    async getRecipeById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'RecipeTypes ID not specified'
                });
                return;
            }
            
            const recipe = await RecipeService.getRecipeById(id);
            
            res.json({
                success: true,
                data: recipe
            });
        } catch (error) {
            console.error(`Error getting recipe with ID ${req.params.id}:`, error);
            const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                error: error instanceof Error ? error.message : 'Error retrieving recipe'
            });
        }
    }
};
