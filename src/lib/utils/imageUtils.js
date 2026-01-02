/**
 * Image Utility Functions
 * Handles image fallbacks and validation
 */

const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

/**
 * Apply placeholder image fallback if image is missing or empty
 * @param {Object} item - Object with image property
 * @returns {Object} - Item with valid image
 */
export function applyImageFallback(item) {
  if (!item.image || item.image.trim() === "") {
    item.image = PLACEHOLDER_IMAGE;
  }
  return item;
}

/**
 * Get safe image URL with fallback
 * @param {string} imageUrl - Original image URL
 * @returns {string} - Valid image URL or placeholder
 */
export function getSafeImageUrl(imageUrl) {
  return (imageUrl && imageUrl.trim() !== "") ? imageUrl : PLACEHOLDER_IMAGE;
}
