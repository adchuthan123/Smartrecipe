/**
 * Global Constants
 */

// Image
export const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_ITEMS_PER_LOAD = 20;

// Slideshow
export const SLIDESHOW_ROTATION_INTERVAL = 4000; // 4 seconds
export const SLIDESHOW_COUNT = 6; // Number of recipes in hero slideshow

// Random Recipe Spinner
export const SPINNER_ANIMATION_DURATION = 1500; // 1.5 seconds
export const SPINNER_UPDATE_SPEED = 100; // Update every 100ms

// Nutrition Limits
export const NUTRITION_LIMITS = {
  kalorienarm: 400, // kcal
  kohlenhydratreich: 40, // grams
  fettarm: 10, // grams
  schnell: 20 // minutes
};

// Recipe Steps
export const EASY_RECIPE_MAX_STEPS = 5;

// Ratings
export const MIN_RATING_STARS = 1;
export const MAX_RATING_STARS = 5;
export const DEFAULT_RATING = { average: 0, count: 0 };
