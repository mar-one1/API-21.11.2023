const express = require('express');
const router = express.Router();
const DetailRecipe = require('../Model/Detail_recipe'); // Import the DetailRecipe model

// Create a detail recipe
router.post('/', (req, res) => {
  const { detail, time, rate, level, calories, recipeId } = req.body;
  DetailRecipe.createDetailRecipe(detail, time, rate, level, calories, recipeId, (err, newDetailRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newDetailRecipe);
  });
});

// Get a detail recipe by ID
router.get('/:id', (req, res) => {
  const detailRecipeId = req.params.id;
  DetailRecipe.getDetailRecipeById(detailRecipeId, (err, detailRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!detailRecipe) {
      return res.status(404).json({ error: 'Detail Recipe not found' });
    }
    res.json(detailRecipe);
  });
});

// Get all detail recipes
router.get('/', (req, res) => {
    DetailRecipe.getAllDetailRecipes((err, detailRecipes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(detailRecipes);
    });
  });

// get recipe by id detailrecipe
router.get('/:id/recipe', (req, res) => {
  const detailRecipeId = req.params.id;
  DetailRecipe.getRecipeByDetailrecipeId(detailRecipeId, (err, recipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  });
});

// get detailrecipe by id recipe
router.get('/:id/detailrecipe', (req, res) => {
  const FKRecipeId = req.params.id;
  DetailRecipe.getDetailRecipeByfkRecipe(FKRecipeId, (err, detailRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!detailRecipe) {
      return res.status(404).json({ error: 'Detail Recipe not found' });
    }
    res.json(detailRecipe);
  });
});
  


// Add more routes for updating, deleting, or other operations as needed



module.exports = router;
