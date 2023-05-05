import express from 'express'
import{getDashboardPage,verifyCompany} from '../controllers/admin.js'


const adminRouter = express.Router();

//Render

adminRouter.get("/:password",getDashboardPage);


//API
adminRouter.post("/verify/:companyId",verifyCompany)

export default adminRouter;