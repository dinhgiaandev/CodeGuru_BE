import express from 'express';
import { activationUser, loginUser, logoutUser, registerUser, updateAccessToken } from '../controller/user.controller';
import { authenticateRole, isAuthenticated } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activation-user', activationUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, authenticateRole("admin"), logoutUser);
userRouter.get('/refresh', updateAccessToken);

export default userRouter