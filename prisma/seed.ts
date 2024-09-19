import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create restaurants
  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Delicious Bites',
      location: '123 Main St, Foodville',
    },
  });

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Tasty Treats',
      location: '456 Elm St, Flavortown',
    },
  });

  // Create menu items for restaurants
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Burger',
        description: 'Juicy beef patty with fresh toppings',
        ingredients: ['beef', 'lettuce', 'tomato', 'cheese'],
        calories: 550,
        price: 9.99,
        restaurantId: restaurant1.id,
      },
      {
        name: 'Pizza',
        description: 'Classic Margherita pizza',
        ingredients: ['dough', 'tomato sauce', 'mozzarella', 'basil'],
        calories: 800,
        price: 12.99,
        restaurantId: restaurant1.id,
      },
      {
        name: 'Salad',
        description: 'Fresh garden salad',
        ingredients: ['lettuce', 'cucumber', 'tomato', 'vinaigrette'],
        calories: 200,
        price: 7.99,
        restaurantId: restaurant2.id,
      },
      // Add more menu items as needed
    ],
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
