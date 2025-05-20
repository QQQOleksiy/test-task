import express from 'express';
import { recipeController } from '../controllers/recipeController';

const router = express.Router();

router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);

export { router as recipeRoutes };
