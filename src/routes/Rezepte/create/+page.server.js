import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    // Categories zu Array verarbeiten
    const categoriesString = data.get("categories");
    const categories = categoriesString 
      ? categoriesString.split(',').filter(c => c.trim() !== '')
      : [];

    let recipe = {
      name: data.get("name"),
      title: data.get("name"), // Auch als title speichern
      duration: Number(data.get("duration")),
      time: Number(data.get("duration")), // Auch als time speichern
      servings: Number(data.get("servings")),
      portions: Number(data.get("servings")), // Auch als portions speichern
      image: data.get("image") || "/images/placeholder.jpg",
      category: categories, // Array von Kategorien
      ingredients: data.get("ingredients").split("\n").map(i => i.trim()).filter(i => i),
      instructions: data.get("instructions").split("\n").map(i => i.trim()).filter(i => i),
      steps: data.get("instructions").split("\n").map(i => i.trim()).filter(i => i), // Auch als steps
      rating: { average: 0, count: 0 }
    };

    await db.createRecipe(recipe);
    return { success: true };
  }
};
