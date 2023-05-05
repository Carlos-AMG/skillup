
import {getAllCompanies, getAllStudents} from "../helpers/utils.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getDashboardPage = async (req,res) => {
    const {password} = req.params

    if (password === "admin"){
        const companies = await getAllCompanies()
        const students = await getAllStudents()
        res.render("admin/adminDashboard", {companies, students})

    }else{
        res.render("admin/error")
    }
}

//API 
export const verifyCompany = async (req,res) =>{
    const {companyId} = req.params
    try{
        const verify = await prisma.company.update({
            where:{
                id:companyId
            },
            data:{
                verified:true
            }
        })
        res.status(200).json({ message: 'Company verified successfully', verify });
    }catch{
        res.status(500).json({ message: 'Error verifying company', error });
    }
}