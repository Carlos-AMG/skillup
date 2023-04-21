import express from 'express'
import{
    logInStudent,
    signUpStudent,
    formularioOlvidePassword
} from '../controllers/student.js'

const router = express.Router();


router.get('/login',logInStudent)
router.get('/signup',signUpStudent)
router.get('/olvide-password',formularioOlvidePassword)


export default router;