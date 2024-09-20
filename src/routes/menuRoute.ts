import express from 'express';
import { getRestaurantMenu } from '../controllers/menu.controller';
import { authenticateUser } from '../middlewares';

const menuRouter = express.Router();

menuRouter.get('/menu/:restaurantId', authenticateUser, getRestaurantMenu);

export default menuRouter;
