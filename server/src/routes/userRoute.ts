import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import {
  userValidationSchema,
  validateRequest,
} from '../middlewares/validation';
import logger from '../middlewares/logger';

const userRouter = express.Router();

userRouter.post(
  '/auth/register',
  logger,
  userValidationSchema,
  validateRequest,
  registerUser
);
userRouter.post(
  '/auth/login',
  logger,
  userValidationSchema,
  validateRequest,
  loginUser
);

export default userRouter;
