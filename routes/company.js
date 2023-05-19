import express from 'express'
import{getOffersPage,getProfilePage,createJob,createCourse, getSkillersPage, getDashboardPage,getEditFormPage,updateJob,updateCourse,deleteOffer} from '../controllers/company.js'
import { jobValidator,courseValidator } from '../validators/authValidators.js';
import isAuth from '../middlewares/isAuth.js'
const companyRouter = express.Router();

//Render
companyRouter.get("/profile",isAuth, getProfilePage);
companyRouter.get("/offers",isAuth, getOffersPage);
companyRouter.get("/dashboard",isAuth,getDashboardPage);
companyRouter.get("/skillers/:offerType/:offerId",isAuth, getSkillersPage)
companyRouter.get("/edit-offer/:offerType/:offerId",isAuth, getEditFormPage)
//Api
companyRouter.post("/job",jobValidator,createJob);
companyRouter.post("/course",courseValidator,createCourse)
companyRouter.post("/update-job/:id",jobValidator,updateJob) 
companyRouter.post("/update-course/:id",courseValidator,updateCourse)
companyRouter.post("/delete-offer/:offerType/:offerId",deleteOffer)




export default companyRouter;