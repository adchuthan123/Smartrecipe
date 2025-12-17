import db from '$lib/db.js';

export async function load() {
  const recipes = await db.getRecipes();
  const recentComments = await db.getRecentComments(10);
  
  return { 
    recipes,
    recentComments 
  };
}
