import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import { userValidationSchema } from '../middlewares/validation';

const userRouter = express.Router();

userRouter.post('/auth/register', userValidationSchema, registerUser);
userRouter.post('/auth/login', userValidationSchema, loginUser);

export default userRouter;
