/**
 * Recipe filter and sort utilities
 */

export interface Nutrition {
  calories: number; // kcal
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
}

export interface Rating {
  average: number;  // average stars 0–5
  count: number;    // number of ratings / comments
}

export interface Recipe {
  id: number;
  title: string;
  category: string[];   // e.g. ["Vegan", "Kalorienarm"]
  time: number;         // minutes
  portions: number;
  image: string;
  nutrition: Nutrition;
  ingredients: string[]; // e.g. ["2 Lachsfilets à ca. 150g", ...]
  steps: string[];       // list of instruction strings
  rating: Rating;
}

export interface FilterOptions {
  kalorienarm?: boolean;
  kohlenhydratreich?: boolean;
  fettarm?: boolean;
  schnell?: boolean;
  einfach?: boolean;
  allergies?: string[];
  minRating?: number;
  sortBy?: "mostComments" | "bestRating";
}

// ==================== FILTER HELPERS ====================

/**
 * Check if recipe is low-calorie (≤400 kcal)
 */
function isKalorienarm(recipe: Recipe): boolean {
  return recipe.nutrition.calories <= 400;
}

/**
 * Check if recipe is high-carb (≥40g carbs)
 */
function isKohlenhydratreich(recipe: Recipe): boolean {
  return recipe.nutrition.carbs >= 40;
}

/**
 * Check if recipe is low-fat (≤10g fat)
 */
function isFettarm(recipe: Recipe): boolean {
  return recipe.nutrition.fat <= 10;
}

/**
 * Check if recipe is quick to make (≤20 minutes)
 */
function isSchnell(recipe: Recipe): boolean {
  return recipe.time <= 20;
}

/**
 * Check if recipe is easy (less than 5 steps)
 */
function isEinfach(recipe: Recipe): boolean {
  return recipe.steps.length < 5;
}

/**
 * Check if recipe passes allergy restrictions.
 * Returns TRUE if recipe is safe (no allergens found).
 * Returns FALSE if any ingredient contains any allergy keyword (case-insensitive).
 */
function passesAllergies(recipe: Recipe, allergies: string[]): boolean {
  if (!allergies || allergies.length === 0) {
    return true;
  }

  // Convert all allergens to lowercase for case-insensitive matching
  const allergyLower = allergies.map(a => a.toLowerCase());

  // Check each ingredient
  for (const ingredient of recipe.ingredients) {
    const ingredientLower = ingredient.toLowerCase();
    
    // If any allergen is found in this ingredient, filter out the recipe
    for (const allergen of allergyLower) {
      if (ingredientLower.includes(allergen)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Check if recipe meets minimum rating requirement
 */
function meetsMinRating(recipe: Recipe, minRating: number): boolean {
  return recipe.rating.average >= minRating;
}

// ==================== SORT HELPERS ====================

/**
 * Sort recipes by number of comments (rating count) in descending order
 */
function sortByMostComments(recipes: Recipe[]): Recipe[] {
  return [...recipes].sort((a, b) => b.rating.count - a.rating.count);
}

/**
 * Sort recipes by average rating in descending order
 */
function sortByBestRating(recipes: Recipe[]): Recipe[] {
  return [...recipes].sort((a, b) => b.rating.average - a.rating.average);
}

// ==================== MAIN FUNCTION ====================

/**
 * Filter and sort recipes based on various criteria.
 * 
 * All filters use AND logic - a recipe must pass ALL enabled filters.
 * Filters are only applied if their corresponding option is set.
 * 
 * @param recipes - Array of recipes to filter
 * @param options - Filter and sort options
 * @returns Filtered and sorted array of recipes
 * 
 * @example
 * ```typescript
 * const filtered = filterRecipes(allRecipes, {
 *   kalorienarm: true,
 *   schnell: true,
 *   allergies: ["nuss", "laktose"],
 *   minRating: 4.0,
 *   sortBy: "bestRating"
 * });
 * ```
 */
export function filterRecipes(
  recipes: Recipe[],
  options: FilterOptions
): Recipe[] {
  let filtered = recipes;

  // Apply each filter if the option is set
  if (options.kalorienarm) {
    filtered = filtered.filter(isKalorienarm);
  }

  if (options.kohlenhydratreich) {
    filtered = filtered.filter(isKohlenhydratreich);
  }

  if (options.fettarm) {
    filtered = filtered.filter(isFettarm);
  }

  if (options.schnell) {
    filtered = filtered.filter(isSchnell);
  }

  if (options.einfach) {
    filtered = filtered.filter(isEinfach);
  }

  if (options.allergies && options.allergies.length > 0) {
    filtered = filtered.filter(recipe => passesAllergies(recipe, options.allergies!));
  }

  if (options.minRating !== undefined) {
    filtered = filtered.filter(recipe => meetsMinRating(recipe, options.minRating!));
  }

  // Apply sorting if specified
  if (options.sortBy === "mostComments") {
    filtered = sortByMostComments(filtered);
  } else if (options.sortBy === "bestRating") {
    filtered = sortByBestRating(filtered);
  }

  return filtered;
}

// ==================== CONVENIENCE EXPORTS ====================

/**
 * Get recipes with specific dietary requirements
 */
export function getHealthyRecipes(recipes: Recipe[]): Recipe[] {
  return filterRecipes(recipes, {
    kalorienarm: true,
    fettarm: true,
    minRating: 3.5,
    sortBy: "bestRating"
  });
}

/**
 * Get quick and easy recipes
 */
export function getQuickRecipes(recipes: Recipe[]): Recipe[] {
  return filterRecipes(recipes, {
    schnell: true,
    einfach: true,
    sortBy: "bestRating"
  });
}

/**
 * Get high-protein, low-carb recipes (useful for specific diets)
 */
export function getHighProteinRecipes(recipes: Recipe[]): Recipe[] {
  return recipes.filter(recipe => {
    return recipe.nutrition.protein >= 25 && recipe.nutrition.carbs <= 20;
  }).sort((a, b) => b.nutrition.protein - a.nutrition.protein);
}
