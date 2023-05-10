import express from 'express'
const offersRouter = express.Router();
import { getOfferDetails,getAllOffers } from '../controllers/offers.js';
//API

offersRouter.get('/api/offers/:offerType',getAllOffers)
offersRouter.get('/api/offer-details/:offerType/:offerId', getOfferDetails);

export default offersRouter;