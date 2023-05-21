import express from 'express'
import{getOffersPage,getProfilePage,createJob,createCourse, getSkillersPage, getDashboardPage,getEditFormPage,updateJob,updateCourse,deleteOffer,sendContactEmail} from '../controllers/company.js'
import { jobValidator,courseValidator,jobEditValidator,courseEditValidator } from '../validators/authValidators.js';
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
companyRouter.post("/update-job/:id",jobEditValidator,updateJob) 
companyRouter.post("/update-course/:id",courseEditValidator,updateCourse)
companyRouter.post("/delete-offer/:offerType/:offerId",deleteOffer)
companyRouter.post("/send-email/:studentName/:studentEmail",sendContactEmail)





export default companyRouter;