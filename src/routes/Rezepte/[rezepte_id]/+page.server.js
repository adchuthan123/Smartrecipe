import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    recipe: await db.getRecipe(params.rezepte_id),
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteRecipe(data.get("id"));
    redirect(303, "/Rezepte");
  }
};
