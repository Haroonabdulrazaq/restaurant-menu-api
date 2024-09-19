import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

app.get('/api', (req, res) => {
  res.send('Hello World, API for restaurant menu');
});

async function startServer() {
  await checkDatabaseConnection();
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startServer();
