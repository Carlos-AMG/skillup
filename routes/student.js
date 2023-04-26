import express from 'express'
import {
    logInStudent,
    signUpStudent,
    register,
    confirm,
    formularioOlvidePassword,
    postSignIn,
    getProfilePage,
    getDashboardPage
} from '../controllers/student.js'

const studentRouter = express.Router();
//Render
studentRouter.get('/login', logInStudent);
// studentRouter.post("/students/login", register);


studentRouter.get("/profile",getProfilePage);
studentRouter.get("/dashboard", getDashboardPage)
studentRouter.post("/login",[postSignIn])
studentRouter.get('/signup', signUpStudent);
studentRouter.post("/signup",  register);

studentRouter.get('/confirm/:token',confirm)

studentRouter.get("/forgot-password", formularioOlvidePassword);


export default studentRouter;