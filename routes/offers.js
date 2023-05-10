import express from 'express'
const offersRouter = express.Router();

//API

offersRouter.get('api/offer-cards/:offerType')
offersRouter.get('api/offer-details/:offerType/:id')