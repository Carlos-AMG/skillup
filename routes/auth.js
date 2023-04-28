import { Router } from "express";

import {
  forgotPassword,
  signInPage,
  signUpPage,
  postSignIn,
  registerUser
} from "../controllers/auth.js";
import { userTypeValidation } from "../middlewares/userValidation.js";

const authRouter = Router();

//Render
authRouter.get('/:userType/login', signInPage);
authRouter.get('/:userType/signup', signUpPage);


// SignIn routes`
authRouter.post("/:userType/login", postSignIn);

// SignUp routes
authRouter.post("/:userType/signup",userTypeValidation,  registerUser);

authRouter.get("/:userType/forgot-password", forgotPassword);

/*
authRouter.get("/:userType/reset-password/:token", getResetPassword);
authRouter.post("/:userType/reset-password/:token", postResetPassword);
*/

export default authRouter;

