/**
 * Recipe Utility Functions
 * Handles recipe-specific operations and calculations
 */

/**
 * Convert MongoDB ObjectId to string
 * @param {Object} recipe - Recipe object
 * @returns {Object} - Recipe with string ID
 */
export function normalizeRecipeId(recipe) {
  if (recipe._id && recipe._id.toString) {
    recipe._id = recipe._id.toString();
  }
  return recipe;
}

/**
 * Format recipe for display
 * @param {Object} recipe - Raw recipe object
 * @returns {Object} - Formatted recipe
 */
export function formatRecipe(recipe) {
  return {
    ...recipe,
    category: recipe.category || [],
    ingredients: recipe.ingredients || [],
    steps: recipe.steps || [],
    nutrition: recipe.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0 },
    rating: recipe.rating || { average: 0, count: 0 }
  };
}

/**
 * Validate recipe data
 * @param {Object} recipe - Recipe to validate
 * @returns {boolean} - Is recipe valid
 */
export function isValidRecipe(recipe) {
  return recipe && 
         recipe.title && 
         recipe.category && 
         Array.isArray(recipe.category);
}
