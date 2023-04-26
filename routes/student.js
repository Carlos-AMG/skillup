import express from 'express'
import {getProfilePage, getDashboardPage} from '../controllers/student.js'

const studentRouter = express.Router();

studentRouter.get("/profile",getProfilePage);
studentRouter.get("/dashboard", getDashboardPage)

export default studentRouter;