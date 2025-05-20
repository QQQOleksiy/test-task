const API_BASE_URL = process.env.MEALDB_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

const apiUrls = {
    allRecipes: (): string => `${API_BASE_URL}/search.php?s=`,
    recipesByIngredient: (ingredient: string): string => `${API_BASE_URL}/filter.php?i=${ingredient}`,
    recipesByCountry: (country: string): string => `${API_BASE_URL}/filter.php?a=${country}`,
    recipesByCategory: (category: string): string => `${API_BASE_URL}/filter.php?c=${category}`,
    recipeById: (id: string): string => `${API_BASE_URL}/lookup.php?i=${id}`,
};

export {
    API_BASE_URL,
    apiUrls
};
