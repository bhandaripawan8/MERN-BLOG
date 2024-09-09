import express from 'express'
const userRouter = express.Router();
import {registerUser, loginUser} from '../controller/userController.js';

userRouter.post('/register', registerUser);
userRouter.post('/login',  loginUser);

export default userRouter;