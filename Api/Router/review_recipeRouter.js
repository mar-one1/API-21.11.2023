const express = require('express');
const router = express.Router();
const ReviewRecipe = require('../Model/Review_recipe'); // Import the ReviewRecipe model

// Create a review recipe
router.post('/', (req, res) => {
  const { detailReview, rateReview, recipeId } = req.body;

  // Validate request data here if needed

  ReviewRecipe.createReviewRecipe(detailReview, rateReview, recipeId, (err, newReviewRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(newReviewRecipe);
  });
});

// Get all review recipes
router.get('/', (req, res) => {
  ReviewRecipe.getAllReviewRecipes((err, reviewRecipes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(reviewRecipes);
  });
});

// Get reviews by recipe ID
router.get('/recipe/:id', (req, res) => {
  const recipeId = req.params.id;
  ReviewRecipe.getReviewsByRecipeId(recipeId, (err, reviews) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!reviews || reviews.length === 0) {
      return res.status(406).json({ error: 'Reviews not found for this recipe' });
    }
    res.json(reviews);
  });
});

// Add more routes for updating, deleting, or other operations as needed

// Update a review recipe by ID
router.put('/:id', (req, res) => {
  const reviewId = req.params.id;
  const { detailReview, rateReview, recipeId } = req.body;

  // Validate request data here if needed

  ReviewRecipe.updateReviewRecipe(reviewId, detailReview, rateReview, recipeId, (err, updatedReviewRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!updatedReviewRecipe) {
      return res.status(406).json({ error: 'Review recipe not found or not updated' });
    }
    res.json(updatedReviewRecipe);
  });
});

// Delete a review recipe by ID
router.delete('/:id', (req, res) => {
  const reviewId = req.params.id;

  ReviewRecipe.deleteReviewRecipe(reviewId, (err, deleted) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!deleted) {
      return res.status(406).json({ error: 'Review recipe not found or not deleted' });
    }
    res.json({ message: 'Review recipe deleted successfully' });
  });
});

module.exports = router;
