import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const submitOrder = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuItemIds, totalPrice } = req.body;
    const userId = (req as any).user.userId;

    const existingMenuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: menuItemIds },
      },
    });

    const existingMenuItemIds = existingMenuItems.map((item) => item.id);

    const order = await prisma.order.create({
      data: {
        restaurantId,
        userId,
        menuItems: {
          connect: existingMenuItemIds.map((id) => ({ id })),
        },
        totalPrice,
      },
    });

    res.json({ message: 'Order submitted successfully', order });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Error submitting order' });
  }
};
