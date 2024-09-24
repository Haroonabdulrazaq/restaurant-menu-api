import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getRestaurantMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(restaurantId),
      },
    });
    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    const menu = await prisma.menuItem.findMany({
      where: {
        restaurantId: Number(restaurantId),
      },
      include: {
        restaurant: true,
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
