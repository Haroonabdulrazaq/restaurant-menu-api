import { body } from 'express-validator';

// Restaurant validation schema
export const restaurantValidationSchema = [
  body('name').notEmpty().withMessage('Restaurant name is required'),
  body('address').notEmpty().withMessage('Address is required'),
];

// User validation schema
export const userValidationSchema = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .isAlphanumeric()
    .withMessage('Password must be alphanumeric'),
];

// Order validation schema
export const orderValidationSchema = [
  body('userId').isInt().withMessage('Valid user ID is required'),
  body('restaurantId').isInt().withMessage('Valid restaurant ID is required'),
  body('menuItems').isArray().withMessage('Items must be an array'),
  body('items.*.menuItemId')
    .isInt()
    .withMessage('Valid menu item ID is required'),
  body('totalPrice')
    .notEmpty()
    .withMessage('Total price is required')
    .isInt()
    .withMessage('Total price must be an integer'),
];

// Menu validation schema
export const menuValidationSchema = [
  body('name').notEmpty().withMessage('Menu item name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('ingredient').isArray().withMessage('Ingredient must be an Array'),
  body('items.*.ingredient')
    .isString()
    .withMessage('Ingredient must be a string'),
  body('calories').isInt().withMessage('Calories must be an integer'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('restaurantId').isInt().withMessage('Valid restaurant ID is required'),
];
