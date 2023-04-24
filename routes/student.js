import express from 'express'
import {} from '../controllers/student.js'

const studentRouter = express.Router();

studentRouter.post('/signup', register)

export default studentRouter;