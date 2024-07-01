const express = require('express');
const router = express.Router();
const Recipe = require('../Model/Recipe'); // Import the Recipe model
const Fuse = require('fuse.js');

// Create a recipe
router.post('/', (req, res) => {
  const { name, icon, fav, userId } = req.body;
  Recipe.createRecipe(name, icon, fav, userId, (err, newRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newRecipe);
  });
});

// Get a recipe by ID
router.get('/:id', (req, res) => {
  const recipeId = req.params.id;
  Recipe.getRecipeById(recipeId, (err, recipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  });
});

// Get all recipes
router.get('/', (req, res) => {
  Recipe.getAllRecipes((err, recipes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(recipes);
  });
});

// get User by id recipe
router.get('/:id/user', (req, res) => {
  const recipeId = req.params.id;
  Recipe.getUserByRecipeId(recipeId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// get recipes by id User
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  Recipe.getRecipesByUserId(userId, (err, recipes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: 'Recipes not found for this user' });
    }
    res.json(recipes);
  });
});



router.get('/search/nom', (req, res) =>  {
  const searchTerm = req.query.key;
  console.log("key : " + searchTerm);
  Recipe.searchRecipes(searchTerm,(err, recipes)=> {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: 'Recipes not found !!!' });
    }
    res.json(recipes);
  });
});
// Add more routes for updating, deleting, or other operations as needed

module.exports = router;
