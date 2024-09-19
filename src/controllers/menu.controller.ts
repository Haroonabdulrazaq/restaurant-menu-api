import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getRestaurantMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const menu = await prisma.menuItem.findMany({
      where: {
        restaurantId: Number(restaurantId),
      },
    });

    if (menu.length === 0) {
      return res
        .status(404)
        .json({ error: 'Menu not found for this restaurant' });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving restaurant menu' });
  }
};
