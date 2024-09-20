import express from 'express';
import { submitOrder } from '../controllers/order.controller';
import { authenticateUser } from '../middlewares';
import {
  orderValidationSchema,
  validateRequest,
} from '../middlewares/validation';

const orderRouter = express.Router();

orderRouter.post(
  '/order',
  authenticateUser,
  orderValidationSchema,
  validateRequest,
  submitOrder
);

export default orderRouter;
