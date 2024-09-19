import express from 'express';
import { getRestaurantMenu } from '../controllers/menu.controller';
import { authenticateUser } from '../middlewares';
import { menuValidationSchema } from '../middlewares/validation';

const menuRouter = express.Router();

menuRouter.get(
  '/menu/:restaurantId',
  authenticateUser,
  menuValidationSchema,
  getRestaurantMenu
);

export default menuRouter;
