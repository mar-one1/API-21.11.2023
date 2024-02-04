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
}

module.exports = RecipeRepository;