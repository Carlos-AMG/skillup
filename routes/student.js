import express from 'express'
import {
    logInStudent,
    signUpStudent,
    register,
    confirm,
    formularioOlvidePassword,
    postSignIn,
    getProfilePage,
    getDashboardPage,
    resetPassword,
    checkToken,
    newPassword,
    getmyUpsPage
} from '../controllers/student.js'

import isAuth from'../helpers/isAuth.js'


const studentRouter = express.Router();
//Render
studentRouter.get('/signup', signUpStudent);

studentRouter.get('/login', logInStudent);

// studentRouter.post("/students/login", register);


studentRouter.get("/profile", isAuth,getProfilePage);

studentRouter.get("/dashboard",isAuth, getDashboardPage)
studentRouter.get("/my-ups", isAuth,getmyUpsPage)

//api
studentRouter.post("/signup",  register);
studentRouter.post("/login",postSignIn)

studentRouter.get('/confirm/:token',confirm)

studentRouter.get("/forgot-password", formularioOlvidePassword);
studentRouter.post("/forgot-password", resetPassword);

//Almacena el nuevo password
studentRouter.get('/forgot-password/:token',checkToken)
studentRouter.post('/forgot-password/:token',newPassword)

export default studentRouter;