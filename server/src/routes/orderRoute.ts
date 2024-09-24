import express from 'express';
import { submitOrder } from '../controllers/order.controller';
import { authenticateUser } from '../middlewares';
import {
  orderValidationSchema,
  validateRequest,
} from '../middlewares/validation';
import logger from '../middlewares/logger';

const orderRouter = express.Router();

orderRouter.post(
  '/order',
  logger,
  authenticateUser,
  orderValidationSchema,
  validateRequest,
  submitOrder
);

export default orderRouter;
