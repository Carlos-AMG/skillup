import express from 'express'
import{getDashboardPage} from '../controllers/admin.js'
import { upload } from '../middlewares/upload.js';

const adminRouter = express.Router();

//Render

adminRouter.get("/:password",getDashboardPage);

export default adminRouter;