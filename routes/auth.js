import express from 'express'
import { getStudentLogin } from '../controllers/auth.cjs';
// const {getStudentLogin} = require("../controllers/auth.cjs") 
const authRouter = express.Router();




//Render
authRouter.get('/student/login', getStudentLogin)

export default authRouter;