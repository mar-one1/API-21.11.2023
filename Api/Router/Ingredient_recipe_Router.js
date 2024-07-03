// ingredients.controller.js
const express = require('express');
const router = express.Router();

const Ingredients = require('../models/ingredient_recipe');

// Create a new ingredient
router.createIngredient = (req, res) => {
  const { ingredient, poidIngredient, NutritionServing } = req.body;
  const newIngredient = Ingredients.create({ ingredient, poidIngredient, NutritionServing });
  res.status(201).json(newIngredient);
};

// Retrieve all ingredients
router.getAllIngredients = (req, res) => {
  const ingredients = Ingredients.getAll();
  res.json(ingredients);
};

// Retrieve a single ingredient by ID
router.getIngredientById = (req, res) => {
  const { id } = req.params;
  const ingredient = Ingredients.getById(id);
  if (!ingredient) {
    return res.status(404).json({ error: 'Ingredient not found' });
  }
  res.json(ingredient);
};

// Update an existing ingredient by ID
router.updateIngredient = (req, res) => {
  const { id } = req.params;
  const { ingredient, poidIngredient, NutritionServing } = req.body;
  Ingredients.updateById(id, { ingredient, poidIngredient, NutritionServing });
  res.json({ message: 'Ingredient updated successfully' });
};

// Delete an existing ingredient by ID
router.deleteIngredient = (req, res) => {
  const { id } = req.params;
  Ingredients.deleteById(id);
  res.json({ message: 'Ingredient deleted successfully' });
};
