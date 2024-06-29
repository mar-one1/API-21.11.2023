<<<<<<< Updated upstream:Api/Model/Ingredient.js
const sqlite3 = require('sqlite3').verbose();


class IngredientRecipe {
  constructor(id, ingredient, poidIngredient, unite, recipeId) {
    this.id = id;
    this.ingredient = ingredient;
    this.poidIngredient = poidIngredient;
    this.unite = unite;
    this.recipeId = recipeId;
  }

  static createIngredientRecipe(ingredient, poidIngredient, unite, recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'INSERT INTO Ingredient (Ingredient_recipe, PoidIngredient_recipe, Unite, FRK_recipe) VALUES (?, ?, ?)',
      [ingredient, poidIngredient, unite, recipeId],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        const newIngredientRecipe = new IngredientRecipe(
          this.lastID,
          ingredient,
          poidIngredient,
          unite,
          recipeId
        );
        callback(null, newIngredientRecipe);
      }
    );
    db.close();
  }

  static getAllIngredientRecipes(callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all('SELECT * FROM Ingredient', (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      const ingredientRecipes = rows.map((row) => {
        return new IngredientRecipe(
          row.Id_Ingredient_recipe,
          row.Ingredient_recipe,
          row.PoidIngredient_recipe,
          row.Unite,
          row.FRk_Detail_recipe
        );
      });
      callback(null, ingredientRecipes);
    });
    db.close();
  }

  static getIngredientRecipeById(ingredientId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.get(
      'SELECT * FROM Ingredient WHERE Id_Ingredient_recipe = ?',
      [ingredientId],
      (err, row) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (!row) {
          callback(null, null); // Ingredient recipe not found
          return;
        }

        const ingredientRecipe = new IngredientRecipe(
          row.Id_Ingredient_recipe,
          row.Ingredient_recipe,
          row.PoidIngredient_recipe,
          row.Unite,
          row.FRK_Recipe
        );
        callback(null, ingredientRecipe);
      }
    );
    db.close();
  }

  
  static getIngredientsByRecipeId(recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all(
      'SELECT * FROM Ingredient WHERE FRK_recipe = ?',
      [recipeId],
      (err, rows) => {
        if (err) {
          callback(err, null);
          return;
        }
        const ingredients = rows.map((row) => {
          return new IngredientRecipe(
            row.Id_Ingredient_recipe,
            row.Ingredient_recipe,
            row.PoidIngredient_recipe,
            row.Unite,
            row.FRK_Recipe
          );
        });
        callback(null, ingredients);
      }
    );
    db.close();
  }

  static updateIngredientRecipe(ingredientId, ingredient, poidIngredient,unite, recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'UPDATE Ingredient SET Ingredient_recipe = ?, PoidIngredient_recipe = ?, Unite, FRK_recipe = ? WHERE Id_Ingredient_recipe = ?',
      [ingredient, poidIngredient, unite, recipeId, ingredientId],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        if (this.changes === 0) {
          callback(null, null); // Ingredient recipe not found or not updated
          return;
        }
        const updatedIngredientRecipe = new IngredientRecipe(
          ingredientId,
          ingredient,
          poidIngredient,
          unite,
          recipeId
        );
        callback(null, updatedIngredientRecipe);
      }
    );
    db.close();
  }

  static deleteIngredientRecipe(ingredientId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'DELETE FROM Ingredient WHERE Id_Ingredient_recipe = ?',
      [ingredientId],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        if (this.changes === 0) {
          callback(null, false); // Ingredient recipe not found or not deleted
          return;
        }
        callback(null, true); // Ingredient recipe deleted successfully
      }
    );
    db.close();
  }

}

=======
const sqlite3 = require('sqlite3').verbose();
const Recipe = require('../Model/Recipe'); // Import the Recipe model

class IngredientRecipe {
  constructor(id, ingredient, poidIngredient, recipeId) {
    this.id = id;
    this.ingredient = ingredient;
    this.poidIngredient = poidIngredient;
    this.recipeId = recipeId;
  }

  static createIngredientRecipe(ingredient, poidIngredient, recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'INSERT INTO Ingredient_recipe (Ingredient_recipe, PoidIngredient_recipe, FRK_recipe) VALUES (?, ?, ?)',
      [ingredient, poidIngredient, recipeId],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        const newIngredientRecipe = new IngredientRecipe(
          this.lastID,
          ingredient,
          poidIngredient,
          recipeId
        );
        callback(null, newIngredientRecipe);
      }
    );
    db.close();
  }

  static getAllIngredientRecipes(callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all('SELECT * FROM Ingredient_recipe', (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      const ingredientRecipes = rows.map((row) => {
        return new IngredientRecipe(
          row.Id_Ingredient_recipe,
          row.Ingredient_recipe,
          row.PoidIngredient_recipe,
          row.FRk_Detail_recipe
        );
      });
      callback(null, ingredientRecipes);
    });
    db.close();
  }

  static getIngredientRecipeById(ingredientId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.get(
      'SELECT * FROM Ingredient_recipe WHERE Id_Ingredient_recipe = ?',
      [ingredientId],
      (err, row) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (!row) {
          callback(null, null); // Ingredient recipe not found
          return;
        }

        const ingredientRecipe = new IngredientRecipe(
          row.Id_Ingredient_recipe,
          row.Ingredient_recipe,
          row.PoidIngredient_recipe,
          row.FRK_Recipe
        );
        callback(null, ingredientRecipe);
      }
    );
    db.close();
  }

  
  static getIngredientsByRecipeId(recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all(
      'SELECT * FROM Ingredient_recipe WHERE FRK_recipe = ?',
      [recipeId],
      (err, rows) => {
        if (err) {
          callback(err, null);
          return;
        }
        const ingredients = rows.map((row) => {
          return new IngredientRecipe(
            row.Id_Ingredient_recipe,
            row.Ingredient_recipe,
            row.PoidIngredient_recipe,
            row.FRK_Recipe
          );
        });
        callback(null, ingredients);
      }
    );
    db.close();
  }

  static updateIngredientRecipe(ingredientId, ingredient, poidIngredient, recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'UPDATE Ingredient_recipe SET Ingredient_recipe = ?, PoidIngredient_recipe = ?, FRK_recipe = ? WHERE Id_Ingredient_recipe = ?',
      [ingredient, poidIngredient, recipeId, ingredientId],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        if (this.changes === 0) {
          callback(null, null); // Ingredient recipe not found or not updated
          return;
        }
        const updatedIngredientRecipe = new IngredientRecipe(
          ingredientId,
          ingredient,
          poidIngredient,
          recipeId
        );
        callback(null, updatedIngredientRecipe);
      }
    );
    db.close();
  }

  static deleteIngredientRecipe(ingredientId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'DELETE FROM Ingredient_recipe WHERE Id_Ingredient_recipe = ?',
      [ingredientId],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        if (this.changes === 0) {
          callback(null, false); // Ingredient recipe not found or not deleted
          return;
        }
        callback(null, true); // Ingredient recipe deleted successfully
      }
    );
    db.close();
  }

}

>>>>>>> Stashed changes:Api/Model/Ingredient_recipe.js
module.exports = IngredientRecipe;