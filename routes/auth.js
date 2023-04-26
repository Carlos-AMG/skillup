import { Router } from "express";
import { main } from "../controllers/auth.js";
// import {
//   forgotPassword,
//   signInPage,
//   signUpPage,
//   postSignIn,
//   registerUser
// } from "../controllers/auth.js";
// import { userTypeValidation } from "../middlewares/userValidation.js";

const authRouter = Router();

authRouter.get('/',main)

export default authRouter;

