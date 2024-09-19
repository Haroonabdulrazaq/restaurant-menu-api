import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { authenticateUser } from '../middlewares';

const orderRouter = express.Router();
const prisma = new PrismaClient();

// Create an order (protected route)
orderRouter.post(
  '/order',
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const { restaurantId, items, totalPrice } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const order = await prisma.order.create({
        data: {
          restaurantId,
          items,
          totalPrice,
          userId,
        },
      });
      res
        .status(201)
        .json({ message: 'Order created successfully', orderId: order.id });
    } catch (error) {
      res.status(500).json({ error: 'Error creating order' });
    }
  }
);

export default orderRouter;
