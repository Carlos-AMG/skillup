import express from 'express'
import{getDashboardPage,getProfilePage,getUpsPage,getOfferCards,getOfferDetails,postInterest
    ,updateStudentProfile,getStudentCv,getStudentImage,getEditProfilePage, postDisinterest
    ,fetchInterestedOffers} from '../controllers/student.js'
import isAuth from '../middlewares/isAuth.js'
import { upload } from '../middlewares/upload.js';

const studentRouter = express.Router();

//Render
 
studentRouter.get("/dashboard",isAuth,getDashboardPage);
studentRouter.get("/profile",isAuth, getProfilePage);
studentRouter.get("/my-ups", isAuth,getUpsPage);
studentRouter.get("/edit-profile",isAuth,getEditProfilePage)

//API
studentRouter.get('/api/offer-cards/:offerType', getOfferCards);
studentRouter.get('/api/offer-details/:offerType/:offerId', getOfferDetails);

studentRouter.post('/api/express-interest/:offerType/:offerId', postInterest);
studentRouter.post('/api/express-disinterest/:offerType/:offerId', postDisinterest);

studentRouter.get('/api/interest-offers/:currentFilterJobCourse', fetchInterestedOffers);

studentRouter.put('/api/edit-profile', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]), updateStudentProfile);
studentRouter.get('/api/profile-image/:studentId', getStudentImage);
studentRouter.get('/api/cv/:studentId', getStudentCv);

export default studentRouter;