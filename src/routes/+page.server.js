import db from '$lib/db.js';

export async function load() {
  const recipes = await db.getRecipes();
  return { recipes };
}
