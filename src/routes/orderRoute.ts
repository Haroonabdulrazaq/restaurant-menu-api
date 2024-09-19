import express from 'express';
import { submitOrder } from '../controllers/order.controller';
import { authenticateUser } from '../middlewares';

const router = express.Router();

router.post('/', authenticateUser, submitOrder);

export default router;
