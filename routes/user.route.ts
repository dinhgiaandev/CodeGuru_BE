import express from 'express';
import { activationUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateProfilePicture, updateUserInfo, updateUserPassword } from '../controller/user.controller';
import { authenticateRole, isAuthenticated } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activation-user', activationUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/refresh', updateAccessToken);
userRouter.get('/me', getUserInfo);
userRouter.post('/social-auth', socialAuth);
userRouter.put('/update-user-info', updateUserInfo);
userRouter.put('/update-user-password', updateUserPassword);
userRouter.put('/update-user-avatar', updateProfilePicture);

export default userRouter

// isAuthenticated, authenticateRole("admin"),