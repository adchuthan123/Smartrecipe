import db from "$lib/db.js";

export async function load() {
  return {
    recipes: await db.getRecipes()
  };
}

export const actions = {
  deleteRecipe: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    await db.deleteRecipe(id);
  },

  rate: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const rating = Number(data.get("rating"));

    await db.updateRecipe({
      _id: id,
      rating: { average: rating, count: 1 }
    });
  }
};
