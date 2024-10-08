import express from 'express';
import { activationUser, loginUser, registerUser } from '../controller/user.controller';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activation-user', activationUser);
userRouter.post('/login', loginUser);

export default userRouter