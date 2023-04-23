import { Router } from "express";

import {
  forgotPassword,
  signInStudent,
  signInCompany,
  registerStudent,
  registerCompany,
  signInPage,
  signUpPage
} from "../controllers/auth.js";

const authRouter = Router();

//Render
authRouter.get('/:userType/login', signInPage);
authRouter.get('/:userType/signup', signUpPage);


// SignIn routes
authRouter.post("/students/login", signInStudent);
authRouter.post("/companies/login", signInCompany);

// SignUp routes
authRouter.post("/students/signup", registerStudent);
authRouter.post("/companies/signup", registerCompany);

authRouter.get("/:userType/forgot-password", forgotPassword);

export default authRouter;

