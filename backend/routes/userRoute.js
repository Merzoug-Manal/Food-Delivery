import express from 'express';
import { forgotPassword, loginUser,registerUser, resetPassword } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

export default userRouter