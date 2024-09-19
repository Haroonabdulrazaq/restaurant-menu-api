import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const submitOrder = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuItemId, totalPrice } = req.body;
    const userId = (req as any).user.userId; // Assuming the user ID is set by the authentication middleware

    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        menuItemId,
        totalPrice,
      },
    });

    res
      .status(201)
      .json({ message: 'Order submitted successfully', orderId: order.id });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Error submitting order' });
  }
};
