import express from 'express'
import{getDashboardPage,getProfilePage,getUpsPage,getJobCards,getJobDetails} from '../controllers/student.js'
import isAuth from '../middlewares/isAuth.js'
const studentRouter = express.Router();

//Render

studentRouter.get("/dashboard",isAuth,getDashboardPage);
studentRouter.get("/profile",isAuth, getProfilePage);
studentRouter.get("/my-ups", isAuth,getUpsPage);

//API
studentRouter.get('/api/job-cards', getJobCards);
studentRouter.get('/api/job-details/:jobId', getJobDetails);



export default studentRouter;