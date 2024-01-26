const sqlite3 = require('sqlite3').verbose();
const UserModel = require('./User'); // Import the User model

class Recipe {
  constructor(id, name, icon, fav, userId) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.fav = fav;
    this.userId = userId;
  }

static createRecipe(name, icon, fav, userId, callback) {
const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'INSERT INTO Recipe (Nom_Recipe, Icon_recipe, Fav_recipe, Frk_user) VALUES (?, ?, ?, ?)',
      [name, icon, fav, userId],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        const newRecipe = new Recipe(
          this.lastID,
          name,
          icon,
          fav,
          userId
        );
        callback(null, newRecipe);
      }
    );
    db.close();
  }

  static getRecipeById(id, callback) {
const db = new sqlite3.Database('DB_Notebook.db');
    db.get(
      'SELECT * FROM Recipe WHERE Id_recipe = ?',
      [id],
      (err, row) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (!row) {
          callback(null, null); // Recipe not found
          return;
        }
        const recipe = new Recipe(
          row.Id_recipe,
          row.Nom_Recipe,
          row.Icon_recipe,
          row.Fav_recipe,
          row.Frk_user
        );
        callback(null, recipe);
      }
    );
    db.close();
  }

  static deleteimage(pathimage, callback) {    
    const filePathToDelete = './public/uploads/' +pathimage; // Replace with the path to the file you want to delete
    // Check if the file exists
    console.log('path for delete '+filePathToDelete);
    fs.access(filePathToDelete, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('File does not exist or cannot be accessed.');
        return;
      }

      // File exists, proceed to delete
      fs.unlink(filePathToDelete, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
          return;
        }
        console.log('File deleted successfully.');
        callback(null, 'File deleted successfully.');
      });
    });
  }

  static async UpdateRecipeImage(
    id,
    imagebyte,
    callback
  ) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.run(
      'UPDATE Recipe SET Icon_recipe = ? WHERE Id_recipe = ?',
      [imagebyte,id],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        if (this.changes === 0) {
          callback(null, null); // User not found or not updated
          return;
        }
      // If the user doesn't exist, add them to the database
        callback(null, imagebyte);
        console.log(imagebyte);
      });
    db.close();
  }

  static getAllRecipes(callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all('SELECT * FROM Recipe', (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      const recipes = rows.map((row) => {
        return new Recipe(
          row.Id_recipe,
          row.Nom_Recipe,
          row.Icon_recipe,
          row.Fav_recipe,
          row.Frk_user
        );
      });
      callback(null, recipes);
    });
    db.close();
  }

  static getUserByRecipeId(recipeId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.get(
      'SELECT Frk_user FROM Recipe WHERE Id_recipe = ?',
      [recipeId],
      (err, row) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (!row) {
          callback(null, null); // Recipe not found
          return;
        }

        const userId = row.Frk_user;
        UserModel.getUserById(userId, callback);
      }
    );
    db.close();
  }

  static getRecipesByUserId(userId, callback) {
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all(
      'SELECT * FROM Recipe WHERE Frk_user = ?',
      [userId],
      (err, rows) => {
        if (err) {
          callback(err, null);
          return;
        }
        const recipes = rows.map((row) => {
          return new Recipe(
            row.Id_recipe,
            row.Nom_Recipe,
            row.Icon_recipe,
            row.Fav_recipe,
            row.Frk_user
          );
        });
        callback(null, recipes);
      }
    );
    db.close();
  }


static searchRecipes(Nom_Recipe, callback) {
  const fuzzyTerm = `%${Nom_Recipe}%`
    const db = new sqlite3.Database('DB_Notebook.db');
    db.all(
      'SELECT * FROM Recipe WHERE Nom_Recipe LIKE ?',
      [fuzzyTerm],
      (err, rows) => {
        if (err) {
          callback(err, null);
          return;
        }
        const recipes = rows.map((row) => {
          return new Recipe(
            row.Id_recipe,
            row.Nom_Recipe,
            row.Icon_recipe,
            row.Fav_recipe,
            row.Frk_user
          );
        });
        callback(null, recipes);
      }
    );
    db.close();
  }

  // Add a method to get the User associated with this Recipe
  getUser(callback) {
    UserModel.getUserById(this.userId, callback);
  }

  // Add more methods as needed
}

module.exports = Recipe;
