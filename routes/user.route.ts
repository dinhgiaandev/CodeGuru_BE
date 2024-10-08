import express from 'express';
import { activationUser, loginUser, logoutUser, registerUser } from '../controller/user.controller';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activation-user', activationUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);

export default userRouter