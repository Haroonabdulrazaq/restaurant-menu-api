import express from 'express';
import { getRestaurantMenu } from '../controllers/menu.controller';
import { authenticateUser } from '../middlewares';
import logger from '../middlewares/logger';
const menuRouter = express.Router();

menuRouter.get(
  '/menu/:restaurantId',
  logger,
  authenticateUser,
  getRestaurantMenu
);

export default menuRouter;
