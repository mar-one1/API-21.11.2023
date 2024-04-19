const Recipe = require('./RecipeModel');

class RecipeRepository {
  // Create a new recipe
  static async createRecipe(recipeData) {
    try {
      const recipe = new Recipe(recipeData);
      return await recipe.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all recipes for a specific user
  static async getRecipesByUserId(userId) {
    try {
      return await Recipe.find({ userId });
    } catch (error) {
      throw error;
    }
  }

  // Get a recipe by its ID
  static async getRecipeById(recipeId) {
    try {
      return await Recipe.findOne({ id: recipeId });
    } catch (error) {
      throw error;
    }
  }

  // Update a recipe
  static async updateRecipe(recipeId, updatedData) {
    try {
      return await Recipe.findOneAndUpdate({ id: recipeId }, updatedData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a recipe
  static async deleteRecipe(recipeId) {
    try {
      return await Recipe.findOneAndDelete({ id: recipeId });
    } catch (error) {
      throw error;
    }
  }


static async getRecipesByConditions(conditions, callback) {
  // Define conditions for querying
  const whereClause = {};
  for (const key in conditions) {
    whereClause[key] = conditions[key];
  }

  // Perform left join between Recipe and associated models
  Recipe.findAll({
    where: whereClause,
    include: [
      { model: Detail_recipe },
      { model: Ingredient_recipe },
      { model: Step_recipe },
      { model: Review_recipe }
    ]
  }).then(recipes => {
    // Process fetched recipes
    // In this case, you don't need to handle duplicates because Sequelize handles it automatically
    callback(null, { recipes });
  }).catch(err => {
    // Handle error
    callback(err);
  });
}
}

module.exports = RecipeRepository;