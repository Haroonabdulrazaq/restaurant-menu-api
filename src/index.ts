import express from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World, API for restaurant menu');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
