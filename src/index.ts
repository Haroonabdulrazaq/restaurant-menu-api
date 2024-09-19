import express from 'express';
import userRouter from './routes/userRoute';
import { PrismaClient } from '@prisma/client';
import menuRouter from './routes/menuRoute';

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

app.use('/api', userRouter);
app.use('/api', menuRouter);

async function startServer() {
  await checkDatabaseConnection();
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startServer();
