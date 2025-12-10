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

async function getRecipesPaginated(skip = 0, limit = 20) {
  try {
    const collection = db.collection("recipes");
    let recipes = await collection.find({}).skip(skip).limit(limit).toArray();

    recipes = recipes.map((recipe) => {
      recipe._id = recipe._id.toString();
      return applyImageFallback(recipe);
    });

    return recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getTotalRecipeCount() {
  try {
    const collection = db.collection("recipes");
    return await collection.countDocuments({});
  } catch (error) {
    console.log(error);
    return 0;
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

//////////////////////////////////////////
// Ratings
//////////////////////////////////////////

async function getRatingsForRecipe(recipeId) {
  try {
    const collection = db.collection("ratings");
    let ratings = await collection
      .find({ recipeId: recipeId })
      .sort({ createdAt: -1 })
      .toArray();

    ratings = ratings.map((rating) => {
      rating._id = rating._id.toString();
      return rating;
    });

    return ratings;
  } catch (error) {
    console.log("Error getting ratings:", error.message);
    return [];
  }
}

async function createRating(rating) {
  try {
    // Validierung
    if (!rating.recipeId || !rating.stars || rating.stars < 1 || rating.stars > 5) {
      throw new Error("Invalid rating data");
    }

    const ratingData = {
      recipeId: rating.recipeId,
      userId: rating.userId || null,
      stars: parseInt(rating.stars),
      comment: rating.comment || "",
      createdAt: new Date(),
    };

    const collection = db.collection("ratings");
    const result = await collection.insertOne(ratingData);

    // Update recipe's average rating
    await updateRecipeAverageRating(rating.recipeId);

    return result.insertedId.toString();
  } catch (error) {
    console.log("Error creating rating:", error.message);
    return null;
  }
}

async function getAverageRatingForRecipe(recipeId) {
  try {
    const collection = db.collection("ratings");
    const result = await collection
      .aggregate([
        { $match: { recipeId: recipeId } },
        {
          $group: {
            _id: "$recipeId",
            average: { $avg: "$stars" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    if (result.length === 0) {
      return { average: 0, count: 0 };
    }

    return {
      average: Math.round(result[0].average * 10) / 10, // round to 1 decimal
      count: result[0].count,
    };
  } catch (error) {
    console.log("Error getting average rating:", error.message);
    return { average: 0, count: 0 };
  }
}

async function updateRecipeAverageRating(recipeId) {
  try {
    const avgRating = await getAverageRatingForRecipe(recipeId);
    
    const collection = db.collection("recipes");
    await collection.updateOne(
      { _id: new ObjectId(recipeId) },
      { $set: { rating: avgRating } }
    );

    return avgRating;
  } catch (error) {
    console.log("Error updating recipe average rating:", error.message);
    return null;
  }
}

export default {
  getRecipes,
  getRecipesPaginated,
  getTotalRecipeCount,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRatingsForRecipe,
  createRating,
  getAverageRatingForRecipe,
  updateRecipeAverageRating,
};
