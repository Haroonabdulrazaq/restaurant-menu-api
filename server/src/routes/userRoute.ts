import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import {
  userValidationSchema,
  validateRequest,
} from '../middlewares/validation';

const userRouter = express.Router();

userRouter.post(
  '/auth/register',
  userValidationSchema,
  validateRequest,
  registerUser
);
userRouter.post(
  '/auth/login',
  userValidationSchema,
  validateRequest,
  loginUser
);

export default userRouter;
