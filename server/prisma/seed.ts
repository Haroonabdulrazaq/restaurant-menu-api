import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //   // Create restaurants
  //   const restaurant1 = await prisma.restaurant.create({
  //     data: {
  //       name: 'Tasty Bites',
  //       location: '123 Main St, Foodville',
  //     },
  //   });

  //   const restaurant2 = await prisma.restaurant.create({
  //     data: {
  //       name: 'Gourmet Haven',
  //       location: '456 Elm St, Cuisinetown',
  //     },
  //   });

  //   // Create users
  //   const user1 = await prisma.user.create({
  //     data: {
  //       username: 'john_doe',
  //       password: await bcrypt.hash('password123', 10),
  //     },
  //   });

  //   const user2 = await prisma.user.create({
  //     data: {
  //       username: 'jane_smith',
  //       password: await bcrypt.hash('securepass456', 10),
  //     },
  //   });

  //   // Create orders
  //   const order1 = await prisma.order.create({
  //     data: {
  //       userId: user1.id,
  //       restaurantId: restaurant1.id,
  //       totalPrice: 1299,
  //     },
  //   });
  //   const order2 = await prisma.order.create({
  //     data: {
  //       userId: user2.id,
  //       restaurantId: restaurant2.id,
  //       totalPrice: 2499,
  //     },
  //   });

  // Create menu items
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Vegan Buddha Bowl',
        description: 'A wholesome bowl of quinoa, roasted veggies, and hummus',
        ingredients: ['Quinoa', 'Roasted Vegetables', 'Hummus', 'Avocado'],
        calories: 500,
        price: 1499,
        restaurantId: 1,
        orderId: 6,
      },
      {
        name: 'BBQ Chicken Pizza',
        description:
          'Pizza topped with BBQ sauce, grilled chicken, and mozzarella',
        ingredients: ['BBQ Sauce', 'Grilled Chicken', 'Mozzarella', 'Onions'],
        calories: 850,
        price: 1599,
        restaurantId: 2,
        orderId: 3,
      },
      {
        name: 'Caesar Salad',
        description:
          'Classic Caesar salad with romaine lettuce, croutons, and Caesar dressing',
        ingredients: [
          'Romaine Lettuce',
          'Croutons',
          'Caesar Dressing',
          'Parmesan',
        ],
        calories: 400,
        price: 1199,
        restaurantId: 3,
        orderId: 9,
      },
      {
        name: 'Buffalo Wings',
        description: 'Crispy wings tossed in spicy buffalo sauce',
        ingredients: [
          'Chicken Wings',
          'Buffalo Sauce',
          'Celery',
          'Ranch Dressing',
        ],
        calories: 700,
        price: 999,
        restaurantId: 1,
        orderId: 9,
      },
      {
        name: 'Tacos Al Pastor',
        description:
          'Tacos filled with marinated pork, pineapple, and cilantro',
        ingredients: ['Pork', 'Pineapple', 'Cilantro', 'Corn Tortillas'],
        calories: 650,
        price: 1399,
        restaurantId: 2,
        orderId: 10,
      },
      {
        name: 'Avocado Toast',
        description:
          'Wholegrain toast topped with mashed avocado and poached eggs',
        ingredients: [
          'Wholegrain Bread',
          'Avocado',
          'Poached Eggs',
          'Chili Flakes',
        ],
        calories: 400,
        price: 999,
        restaurantId: 1,
        orderId: 11,
      },
      {
        name: 'Fish and Chips',
        description:
          'Crispy fried fish served with golden fries and tartar sauce',
        ingredients: ['Fish Fillet', 'Fries', 'Tartar Sauce', 'Lemon'],
        calories: 900,
        price: 1599,
        restaurantId: 4,
        orderId: 12,
      },
      {
        name: 'Chicken Alfredo Pasta',
        description:
          'Pasta served with a creamy Alfredo sauce and grilled chicken',
        ingredients: [
          'Fettuccine',
          'Grilled Chicken',
          'Alfredo Sauce',
          'Parmesan',
        ],
        calories: 750,
        price: 1699,
        restaurantId: 2,
        orderId: 13,
      },
      {
        name: 'Shrimp Scampi',
        description:
          'Shrimp cooked in a garlic butter sauce served over linguine',
        ingredients: ['Shrimp', 'Garlic', 'Butter', 'Linguine'],
        calories: 600,
        price: 1799,
        restaurantId: 3,
        orderId: 14,
      },
      {
        name: 'Lamb Gyro',
        description:
          'Tender lamb wrapped in pita bread with tzatziki sauce and vegetables',
        ingredients: ['Lamb', 'Pita Bread', 'Tzatziki', 'Tomato', 'Lettuce'],
        calories: 700,
        price: 1399,
        restaurantId: 4,
        orderId: 15,
      },
      {
        name: 'Chicken Biryani',
        description: 'Aromatic rice dish with spiced chicken and herbs',
        ingredients: ['Basmati Rice', 'Chicken', 'Spices', 'Yogurt'],
        calories: 800,
        price: 1699,
        restaurantId: 1,
        orderId: 16,
      },
      {
        name: 'Beef Tacos',
        description:
          'Soft tacos filled with seasoned beef, lettuce, and cheddar',
        ingredients: ['Beef', 'Tortilla', 'Lettuce', 'Cheddar Cheese'],
        calories: 550,
        price: 1299,
        restaurantId: 3,
        orderId: 17,
      },
      {
        name: 'Pad Thai',
        description:
          'Stir-fried rice noodles with shrimp, peanuts, and tamarind sauce',
        ingredients: ['Rice Noodles', 'Shrimp', 'Peanuts', 'Tamarind Sauce'],
        calories: 700,
        price: 1499,
        restaurantId: 4,
        orderId: 18,
      },
      {
        name: 'BBQ Ribs',
        description:
          'Slow-cooked ribs glazed with BBQ sauce, served with coleslaw',
        ingredients: ['Pork Ribs', 'BBQ Sauce', 'Coleslaw', 'Fries'],
        calories: 1000,
        price: 1899,
        restaurantId: 1,
        orderId: 19,
      },
      {
        name: 'Greek Salad',
        description:
          'A light and refreshing salad with cucumbers, olives, and feta',
        ingredients: ['Cucumbers', 'Olives', 'Feta Cheese', 'Olive Oil'],
        calories: 350,
        price: 1199,
        restaurantId: 2,
        orderId: 20,
      },
      {
        name: 'Eggplant Parmesan',
        description:
          'Breaded and fried eggplant topped with marinara and mozzarella',
        ingredients: ['Eggplant', 'Marinara Sauce', 'Mozzarella', 'Parmesan'],
        calories: 600,
        price: 1599,
        restaurantId: 3,
        orderId: 21,
      },
      {
        name: 'Lobster Roll',
        description:
          'Fresh lobster served in a buttered roll with a side of fries',
        ingredients: ['Lobster', 'Butter', 'Roll', 'Fries'],
        calories: 650,
        price: 1999,
        restaurantId: 2,
        orderId: 22,
      },
      {
        name: 'Steak Frites',
        description:
          'Grilled steak served with crispy fries and garlic butter sauce',
        ingredients: ['Steak', 'Fries', 'Garlic Butter', 'Herbs'],
        calories: 950,
        price: 2099,
        restaurantId: 4,
        orderId: 23,
      },
      {
        name: 'Mushroom Risotto',
        description: 'Creamy risotto with wild mushrooms and Parmesan cheese',
        ingredients: ['Arborio Rice', 'Mushrooms', 'Parmesan', 'White Wine'],
        calories: 550,
        price: 1799,
        restaurantId: 1,
        orderId: 1,
      },
      {
        name: 'Falafel Wrap',
        description: 'Falafel wrapped in flatbread with hummus and veggies',
        ingredients: ['Falafel', 'Flatbread', 'Hummus', 'Lettuce', 'Tomatoes'],
        calories: 450,
        price: 1299,
        restaurantId: 3,
        orderId: 2,
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
