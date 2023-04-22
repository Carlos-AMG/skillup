import express from 'express'
import {logIn,signUp,forgotPassword} from '../controllers/auth.js';

const authRouter = express.Router();




//Render
authRouter.get('/:userType/login', logIn);
authRouter.get('/:userType/signup', signUp);
authRouter.get('/:userType/forgot-password', forgotPassword);


export default authRouter;