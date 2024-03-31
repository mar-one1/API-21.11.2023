// recipeValidator.js
const { body } = require('express-validator');

const { param } = require('express-validator');

// Validation middleware for creating a new recipe
const validateCreateRecipe = [
  body('name').trim().notEmpty().withMessage('Recipe name is required'),
  body('icon').optional(),
  //trim().notEmpty().withMessage('Icon URL is required'),
  body('fav').trim().notEmpty().withMessage('Favorite status is required'),
  body('userId').trim().notEmpty().withMessage('User ID is required'),
  // Add more validation rules as needed for other columns
];

// Validation middleware for updating a recipe
const validateUpdateRecipe = [
  body('name').optional().trim().notEmpty().withMessage('Recipe name is required'),
  body('icon').optional(),
  //trim().notEmpty().withMessage('Icon URL is required'),
  body('fav').optional().trim().notEmpty().withMessage('Favorite status is required'),
  body('userId').optional().trim().notEmpty().withMessage('User ID is required'),
  // Add more validation rules as needed for other columns
];

// Validation middleware for deleting a recipe
const validateDeleteRecipe = [
  param('id').trim().notEmpty().withMessage('Recipe ID is required'),
  // Add more validation rules as needed for other parameters
];

// Validation middleware for get a recipe
const validateGetByIdRecipe = [
  param('id').trim().notEmpty().withMessage('Recipe ID is required'),
  // Add more validation rules as needed for other parameters
];

// Validation middleware for get all by userId recipe 
const validateGetByIdUser = [
  param('username').trim().notEmpty().withMessage('User Username is required'),
  // Add more validation rules as needed for other parameters
];

// Validation middleware for get a recipe
const validateGetByUsernameRecipe = [
  param('username').trim().notEmpty().withMessage('User Username is required'),
  // Add more validation rules as needed for other parameters
];
// Export validation functions
module.exports = {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateDeleteRecipe,
  validateGetByUsernameRecipe,
  validateGetByIdRecipe,
  validateGetByIdUser
  // Add more validation functions for other operations (e.g., delete) if needed
};
