import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// Route to register a new user
userRouter.post('/register', registerUser);

// Route to login a user
userRouter.post('/login', loginUser);

// Route to get user profile data
userRouter.get('/profile', authMiddleware, getProfile);

// Route to update user profile data
userRouter.put('/profile', authMiddleware, updateProfile);

export default userRouter;