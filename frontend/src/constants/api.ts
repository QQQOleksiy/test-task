// Base URL for backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// API endpoints for frontend
const apiUrls = {
    allRecipes: (): string => `${API_BASE_URL}/recipes`,
    recipesByIngredient: (ingredient: string): string => `${API_BASE_URL}/recipes?ingredient=${ingredient}`,
    recipesByCountry: (country: string): string => `${API_BASE_URL}/recipes?country=${country}`,
    recipesByCategory: (category: string): string => `${API_BASE_URL}/recipes?category=${category}`,
    recipeById: (id: string): string => `${API_BASE_URL}/recipes/${id}`
};

export {
    API_BASE_URL,
    apiUrls
};
