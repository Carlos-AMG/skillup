import express from 'express'
import{
    logInCompany,
    signUpCompany,
    formularioOlvidePassword
} from '../controllers/company.js'

const router = express.Router();


router.get('/login',logInCompany)
router.get('/signup',signUpCompany)
router.get('/olvide-password',formularioOlvidePassword)


export default router;