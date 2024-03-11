const { body } = require('express-validator');
const { param } = require('express-validator');

const validateUserRegistration = [
  body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
  body('firstname').isLength({ min: 2, max: 50 }).withMessage('Firstname must be between 2 and 50 characters'),
  body('lastname').isLength({ min: 2, max: 50 }).withMessage('Lastname must be between 2 and 50 characters'),
  body('birthday').optional(),
  //.isISO8601().toDate().withMessage('Invalid birthday format'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phoneNumber').isMobilePhone().withMessage('Invalid phone number'),
  body('icon').optional(), // Assuming no specific validation for icon
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('grade').isString().withMessage('Grade must be an string'),
  body('status').isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
];

const validateUserUpdate = [
  body('username').optional().isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
  body('firstname').optional().isLength({ min: 2, max: 50 }).withMessage('Firstname must be between 2 and 50 characters'),
  body('lastname').optional().isLength({ min: 2, max: 50 }).withMessage('Lastname must be between 2 and 50 characters'),
  body('birthday').optional().isISO8601().toDate().withMessage('Invalid birthday format'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('icon').optional(), // Assuming no specific validation for icon
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('grade').optional().isInt().withMessage('Grade must be an integer'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
];


// deleteValidator.js
const validateUserDelete = [
  param('id').isInt().withMessage('Invalid user ID'),
];

// Export middleware functions
module.exports = {
  validateUserRegistration,
  validateUserUpdate,
  validateUserDelete,
  // Add more middleware functions for other models if needed
};
