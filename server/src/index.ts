import express from 'express';
import userRouter from './routes/userRoute';
import { PrismaClient } from '@prisma/client';
import menuRouter from './routes/menuRoute';
import orderRouter from './routes/orderRoute';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return;
  }
}

app.use('/api', userRouter);
app.use('/api', menuRouter);
app.use('/api', orderRouter);

async function startServer() {
  await checkDatabaseConnection();
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startServer();
