const express = require('express');
const { RecipeService } = require('../Schema/RecipeModel');

const router = express.Router();

// CREATE a new recipe
router.post('/recipes', async (req, res) => {
  const { name, icon, fav, userId } = req.body;
  try {
    const recipe = await RecipeService.createRecipe(name, icon, fav, userId);
    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create recipe' });
  }
});

// READ all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await RecipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch recipes' });
  }
});

// READ a single recipe by ID
router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await RecipeService.getRecipeById(id);
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(recipe);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch recipe' });
  }
});

// UPDATE a recipe
router.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, icon, fav, userId } = req.body;
  try {
    const updatedRecipe = await RecipeService.updateRecipe(id, name, icon, fav, userId);
    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update recipe' });
  }
});

// DELETE a recipe
router.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await RecipeService.deleteRecipe(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete recipe' });
  }
});

module.exports = router;
