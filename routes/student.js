import express from 'express'
import{getDashboardPage,getProfilePage,getUpsPage,getOfferCards,getOfferDetails} from '../controllers/student.js'
import isAuth from '../middlewares/isAuth.js'
const studentRouter = express.Router();

//Render

studentRouter.get("/dashboard",isAuth,getDashboardPage);
studentRouter.get("/profile",isAuth, getProfilePage);
studentRouter.get("/my-ups", isAuth,getUpsPage);

//API
studentRouter.get('/api/offer-cards/:offerType', getOfferCards);
studentRouter.get('/api/offer-details/:offerType/:offerId', getOfferDetails);



export default studentRouter;