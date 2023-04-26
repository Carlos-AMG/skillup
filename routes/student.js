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
    newPassword
} from '../controllers/student.js'

const studentRouter = express.Router();
//Render
studentRouter.get('/signup', signUpStudent);
studentRouter.post("/signup",  register);

studentRouter.get('/login', logInStudent);
studentRouter.post("/login",postSignIn)
// studentRouter.post("/students/login", register);


studentRouter.get("/profile",getProfilePage);

studentRouter.get("/dashboard", getDashboardPage)



studentRouter.get('/confirm/:token',confirm)

studentRouter.get("/forgot-password", formularioOlvidePassword);
studentRouter.post("/forgot-password", resetPassword);

//Almacena el nuevo password
studentRouter.get('/forgot-password/:token',checkToken)
studentRouter.post('/forgot-password/:token',newPassword)

export default studentRouter;