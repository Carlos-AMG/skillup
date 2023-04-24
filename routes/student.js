import express from 'express'
import {getProfilePage} from '../controllers/student.js'

const studentRouter = express.Router();

studentRouter.get("/profile",getProfilePage);

export default studentRouter;