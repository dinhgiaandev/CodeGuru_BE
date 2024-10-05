import express from 'express';
import { activationUser, registerUser } from '../controller/user.controller';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activation-user', activationUser);

export default userRouter