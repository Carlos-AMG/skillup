import express from 'express'
import { getCompanyLogin, getStudentLogin } from '../controllers/auth.cjs';
// const {getStudentLogin} = require("../controllers/auth.cjs") 
const authRouter = express.Router();




//Render
authRouter.get('/student/login', getStudentLogin)
authRouter.get('/company/login', getCompanyLogin)

export default authRouter;