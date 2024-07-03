// ingredient_recipe.model.js

const sqlite3 = require('sqlite3').verbose();

class IngredientRecipe {
  constructor(id_Ingeredient_recipe, Frk_idRecipe, Frk_idIngredient) {
    this.id_Ingeredient_recipe = id_Ingeredient_recipe;
    this.Frk_idRecipe = Frk_idRecipe;
    this.Frk_idIngredient = Frk_idIngredient;
  }


  // Create a new ingredient recipe association
  static create(recipeId, ingredientId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'INSERT INTO ingredients_recipe (recipeId, Frk_idIngredient) VALUES (?, ?)',
      [recipeId, ingredientId],
      function(err) {
        if (err) {
          callback(err);
          return;
        }
        const newIngredientRecipe = new IngredientRecipe(this.lastID, recipeId, ingredientId);
        callback(null, newIngredientRecipe);
      }
    );
    db.close();
  }

  // Retrieve all ingredient recipe associations
  static getAll(callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all('SELECT * FROM ingredients_recipe', (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      const associations = rows.map(row => new IngredientRecipe(row.id_Ingeredient_recipe, row.recipeId, row.Frk_idIngredient));
      callback(null, associations);
    });
    db.close();
  }

  // Retrieve all ingredient recipe associations for a recipe
  static getByRecipeId(recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all('SELECT * FROM ingredients_recipe WHERE recipeId = ?', [recipeId], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      const associations = rows.map(row => new IngredientRecipe(row.id_Ingeredient_recipe, row.recipeId, row.Frk_idIngredient));
      callback(null, associations);
    });
    db.close();
  }

  // Retrieve all ingredient recipe associations for a specific ingredient ID
  static getByIngredientId(ingredientId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all('SELECT * FROM ingredients_recipe WHERE Frk_idIngredient = ?', [ingredientId], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      const associations = rows.map(row => new IngredientRecipe(row.id_Ingeredient_recipe, row.recipeId, row.Frk_idIngredient));
      callback(null, associations);
    });
    db.close();
  }

  // Delete all ingredient recipe associations for a recipe
  static deleteByRecipeId(recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run('DELETE FROM ingredients_recipe WHERE recipeId = ?', [recipeId], function(err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
    db.close();
  }
}

module.exports = IngredientRecipe;
