import db from "$lib/db";

export async function load() {
  const recipes = await db.getRecipes();
  return { recipes };
}
