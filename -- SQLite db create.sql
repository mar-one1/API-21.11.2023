-- SQLite
-- Create the User table
CREATE TABLE User (
    Id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    Firstname_user TEXT,
    Lastname_user TEXT,
    Birthday_user TEXT,
    Email_user TEXT,
    Phonenumber_user TEXT,
    Icon_user INTEGER,
    Password_user TEXT,
    Grade_user INTEGER,
    Status_user INTEGER,
    CONSTRAINT unique_username UNIQUE (username)
);

-- Create the Recipe table
CREATE TABLE Recipe (
    Id_recipe INTEGER PRIMARY KEY AUTOINCREMENT,
    Icon_recipe INTEGER,
    Fav_recipe INTEGER,
    Nom_recipe TEXT,
    Frk_user INTEGER,
    FOREIGN KEY (Frk_user) REFERENCES User(Id_user) ON DELETE CASCADE
);

-- Create the DetailRecipe table
CREATE TABLE DetailRecipe (
    Id_detail_recipe INTEGER PRIMARY KEY AUTOINCREMENT,
    Dt_recipe TEXT,
    Dt_recipe_time TEXT,
    Rate_recipe INTEGER,
    Level_recipe INTEGER,
    Calories_recipe INTEGER,
    FRK_recipe INTEGER,
    FOREIGN KEY (FRK_recipe) REFERENCES Recipe(Id_recipe) ON DELETE CASCADE
);

-- Create the ReviewRecipe table
CREATE TABLE ReviewRecipe (
    Id_review_recipe INTEGER PRIMARY KEY AUTOINCREMENT,
    Detail_review_recipe TEXT,
    Rate_review_recipe INTEGER,
    FRK_recipe INTEGER,
    FOREIGN KEY (FRK_recipe) REFERENCES Recipe(Id_recipe) ON DELETE CASCADE
);

-- Create the IngredientRecipe table
CREATE TABLE IngredientRecipe (
    Id_ingredient_recipe INTEGER PRIMARY KEY AUTOINCREMENT,
    Ingredient_recipe TEXT,
    PoidIngredient_recipe REAL,
    FRK_detail_recipe INTEGER,
    FOREIGN KEY (FRK_detail_recipe) REFERENCES DetailRecipe(Id_detail_recipe) ON DELETE CASCADE
);

-- Create the StepRecipe table
CREATE TABLE StepRecipe (
    Id_step_recipe INTEGER PRIMARY KEY AUTOINCREMENT,
    Detail_step_recipe TEXT,
    Image_step_recipe TEXT,
    Time_step_recipe TEXT,
    FRK_recipe INTEGER,
    FOREIGN KEY (FRK_recipe) REFERENCES Recipe(Id_recipe) ON DELETE CASCADE
);

-- Create the Produit table
CREATE TABLE Produit (
    Id_Produit INTEGER PRIMARY KEY AUTOINCREMENT,
    Produit TEXT,
    PoidProduit TEXT
);

-- Create the FavoriteUserRecipe table
CREATE TABLE FavoriteUserRecipe (
    favRecipe_id INTEGER PRIMARY KEY,
    FRK_user INTEGER,
    FRK_recipe INTEGER,
    FOREIGN KEY (FRK_user) REFERENCES User(Id_user),
    FOREIGN KEY (FRK_recipe) REFERENCES Recipe(Id_recipe)
);
