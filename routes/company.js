import express from 'express'
import{getOffersPage,getProfilePage,createJob,createCourse, getSkillers} from '../controllers/company.js'
import isAuth from '../middlewares/isAuth.js'
const companyRouter = express.Router();

//Render
companyRouter.get("/profile",isAuth, getProfilePage);
companyRouter.get("/offers",isAuth, getOffersPage);

companyRouter.get("/skillers",isAuth,getSkillers)
//Api
companyRouter.post("/job",createJob);
companyRouter.post("/course",createCourse)




export default companyRouter;