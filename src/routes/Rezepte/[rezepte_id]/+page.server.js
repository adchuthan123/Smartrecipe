import db from "$lib/db.js";
import { redirect, fail } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe = await db.getRecipe(params.rezepte_id);
  const ratings = await db.getRatingsForRecipe(params.rezepte_id);

  return {
    recipe,
    ratings,
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteRecipe(data.get("id"));
    redirect(303, "/Rezepte");
  },

  addRating: async ({ request, params }) => {
    const data = await request.formData();
    const stars = parseInt(data.get("stars"));
    const comment = data.get("comment");

    // Validierung
    if (!stars || stars < 1 || stars > 5) {
      return fail(400, { error: "Bitte wähle eine Bewertung zwischen 1 und 5 Sternen." });
    }

    const rating = {
      recipeId: params.rezepte_id,
      userId: null, // kann später erweitert werden
      stars,
      comment: comment || "",
    };

    const result = await db.createRating(rating);

    if (!result) {
      return fail(500, { error: "Bewertung konnte nicht gespeichert werden." });
    }

    return { success: true };
  },
};
