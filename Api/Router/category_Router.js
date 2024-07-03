const express = require('express');
const Categoryrecipe = require('../Model/Category_recipe'); // Adjust the path as necessary
const router = express.Router();

// Create a new category recipe
router.post('/', async (req, res) => {
  const { icon, detail_ct } = req.body;
  console.log('Request Body:', req.body);

  if (!icon || !detail_ct) {
    return res.status(400).json({ error: 'Icon and detail_ct are required' });
  }

  try {
    Categoryrecipe.createCategoryRecipe(icon, detail_ct, (err, newCategoryRecipe) => {
      if (err) {
        console.error('Error creating category recipe:', err);
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json(newCategoryRecipe);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// Get all category recipes
router.get('/', async (req, res) => {
  try {
    Categoryrecipe.getAllCategoryRecipes((err, categoryRecipes) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(categoryRecipes);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// Get a category recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    Categoryrecipe.getCategoryRecipeById(id, (err, categoryRecipe) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!categoryRecipe) {
        res.status(404).json({ error: 'Category recipe not found' });
        return;
      }
      res.status(200).json(categoryRecipe);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// Update a category recipe
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { icon, detail_ct } = req.body;

  if (!icon || !detail_ct) {
    return res.status(400).json({ error: 'Icon and detail_ct are required' });
  }

  try {
    Categoryrecipe.updateCategoryRecipe(id, icon, detail_ct, (err, updatedCategoryRecipe) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!updatedCategoryRecipe) {
        res.status(404).json({ error: 'Category recipe not found or not updated' });
        return;
      }
      res.status(200).json(updatedCategoryRecipe);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// Delete a category recipe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    Categoryrecipe.deleteCategoryRecipe(id, (err, success) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!success) {
        res.status(404).json({ error: 'Category recipe not found or not deleted' });
        return;
      }
      res.status(204).send(); // No content to return
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// Delete category recipes by an array of IDs
router.delete('/', async (req, res) => {
    const { ids } = req.body;
    console.log('Delete Request IDs:', ids);
  
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'An array of IDs is required' });
    }
  
    try {
      Categoryrecipe.deleteCategoryRecipes(ids, (err, changes) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (changes === 0) {
          res.status(404).json({ error: 'No category recipes were deleted' });
          return;
        }
        res.status(204).send(); // No content to return
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  });

module.exports = router;
