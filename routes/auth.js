import express from 'express'
import main from '../controllers/auth.js';

const router = express.Router();




//Render
router.get('/', main)


export default router;