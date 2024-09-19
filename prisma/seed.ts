import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce and mozzarella',
        ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
        calories: 800,
        price: 1299,
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing',
        ingredients: [
          'Romaine Lettuce',
          'Croutons',
          'Parmesan',
          'Caesar Dressing',
        ],
        calories: 350,
        price: 899,
      },
    ],
  });

  // Sample Order
  await prisma.order.create({
    data: {
      restaurantId: 1,
      items: [1, 2], // Assuming these are the IDs of the created MenuItems
      totalPrice: 2198,
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
