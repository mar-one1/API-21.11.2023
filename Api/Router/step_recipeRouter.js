const express = require('express');
const router = express.Router();
const StepRecipe = require('../Model/Step_recipe'); // Import the StepRecipe model

// Create a step recipe
router.post('/', (req, res) => {
  const { detailStep, imageStep, timeStep, recipeId } = req.body;

  // Validate request data here if needed

  StepRecipe.createStepRecipe(detailStep, imageStep, timeStep, recipeId, (err, newStepRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(newStepRecipe);
  });
});

// Get All steps
router.get('/', (req, res) => {
  StepRecipe.getAllStepRecipes((err, stepRecipes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(stepRecipes);
  });
});


// Get steps by recipe ID
router.get('/recipe/:id', (req, res) => {
  const recipeId = req.params.id;
  StepRecipe.getStepsByRecipeId(recipeId, (err, steps) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!steps || steps.length === 0) {
      return res.status(406).json({ error: 'Steps not found for this recipe' });
    }
    res.json(steps);
  });
});

// Add more routes for updating, deleting, or other operations as needed

// Update a step recipe by ID
router.put('/:id', (req, res) => {
  const stepId = req.params.id;
  const { detailStep, imageStep, timeStep, recipeId } = req.body;

  // Validate request data here if needed

  StepRecipe.updateStepRecipe(stepId, detailStep, imageStep, timeStep, recipeId, (err, updatedStepRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!updatedStepRecipe) {
      return res.status(406).json({ error: 'Step recipe not found or not updated' });
    }
    res.json(updatedStepRecipe);
  });
});

// Delete a step recipe by ID
router.delete('/:id', (req, res) => {
  const stepId = req.params.id;

  StepRecipe.deleteStepRecipe(stepId, (err, deleted) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!deleted) {
      return res.status(406).json({ error: 'Step recipe not found or not deleted' });
    }
    res.json({ message: 'Step recipe deleted successfully' });
  });
});


module.exports = router;
