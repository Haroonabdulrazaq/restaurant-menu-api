import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// User validation schema
export const userValidationSchema = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3 })
    .withMessage('Username cannot be less than 3 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/
    )
    .withMessage(
      'Password must contain at least one letter, one number, and one special character'
    ),
];

// Order validation schema
export const orderValidationSchema = [
  body('restaurantId')
    .isInt({ min: 1 })
    .withMessage('Valid restaurant ID is required'),
  body('menuItemIds')
    .isArray()
    .notEmpty()
    .withMessage('Items must be a non-empty array')
    .custom((value) => value.length > 0)
    .withMessage('At least one menu item is required'),
  body('menuItemIds.*')
    .isInt({ min: 1 })
    .withMessage('Each menu item ID must be an integer greater than 0'),
  body('totalPrice')
    .notEmpty()
    .withMessage('Total price is required')
    .isInt()
    .withMessage('Total price must be an integer'),
];

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
