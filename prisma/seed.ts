import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create restaurants
  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Tasty Bites',
      location: '123 Main St, Foodville',
    },
  });

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Gourmet Haven',
      location: '456 Elm St, Cuisinetown',
    },
  });

  // Create menu items
  const menuItem1 = await prisma.menuItem.create({
    data: {
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato, mozzarella, and basil',
      ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
      calories: 800,
      price: 1299,
      restaurantId: restaurant1.id,
    },
  });
  const menuItem2 = await prisma.menuItem.create({
    data: {
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons',
      ingredients: [
        'Romaine Lettuce',
        'Caesar Dressing',
        'Croutons',
        'Parmesan',
      ],
      calories: 350,
      price: 899,
      restaurantId: restaurant1.id,
    },
  });
  const menuItem3 = await prisma.menuItem.create({
    data: {
      name: 'Sushi Platter',
      description: 'Assorted sushi rolls with soy sauce and wasabi',
      ingredients: ['Rice', 'Nori', 'Fish', 'Vegetables'],
      calories: 600,
      price: 2499,
      restaurantId: restaurant2.id,
    },
  });
  const menuItem4 = await prisma.menuItem.create({
    data: {
      name: 'Vegetarian Stir Fry',
      description: 'Mixed vegetables stir-fried in a savory sauce',
      ingredients: ['Tofu', 'Mixed Vegetables', 'Soy Sauce', 'Garlic'],
      calories: 450,
      price: 1499,
      restaurantId: restaurant2.id,
    },
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: await bcrypt.hash('password123', 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_smith',
      password: await bcrypt.hash('securepass456', 10),
    },
  });

  // Create orders
  await prisma.order.createMany({
    data: [
      {
        userId: user1.id,
        restaurantId: restaurant1.id,
        totalPrice: 1299,
      },
      {
        userId: user2.id,
        restaurantId: restaurant2.id,
        totalPrice: 2499,
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
