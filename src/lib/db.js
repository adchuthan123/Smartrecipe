import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("SmartRecipe");

//////////////////////////////////////////
// Recipes
//////////////////////////////////////////

// helper → fügt überall fallback hinzu
function applyImageFallback(recipe) {
  if (!recipe.image || recipe.image.trim() === "") {
    recipe.image = "/images/placeholder.jpg";
  }
  return recipe;
}

async function getRecipes() {
  try {
    const collection = db.collection("recipes");
    let recipes = await collection.find({}).toArray();

    recipes = recipes.map((recipe) => {
      recipe._id = recipe._id.toString();
      return applyImageFallback(recipe); // <-- fallback HIER
    });

    return recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getRecipe(id) {
  try {
    const collection = db.collection("recipes");
    const recipe = await collection.findOne({ _id: new ObjectId(id) });

    if (!recipe) {
      console.log("No recipe with id " + id);
      return null;
    }

    recipe._id = recipe._id.toString();
    return applyImageFallback(recipe); // <-- fallback HIER
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function createRecipe(recipe) {
  recipe.rating = recipe.rating || { average: 0, count: 0 };
  applyImageFallback(recipe); // <-- fallback HIER

  try {
    const collection = db.collection("recipes");
    const result = await collection.insertOne(recipe);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function updateRecipe(recipe) {
  try {
    let id = recipe._id;
    delete recipe._id;

    applyImageFallback(recipe); // <-- fallback HIER

    const collection = db.collection("recipes");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: recipe }
    );

    if (!result.matchedCount) {
      console.log("No recipe with id " + id);
      return null;
    }

    console.log("Recipe updated:", id);
    return id;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteRecipe(id) {
  try {
    const collection = db.collection("recipes");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      console.log("No recipe with id " + id);
      return null;
    }

    console.log("Recipe deleted:", id);
    return id;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
