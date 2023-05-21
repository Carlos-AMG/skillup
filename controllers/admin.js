
import {getAllCompanies, getAllStudents} from "../helpers/utils.js";
import { PrismaClient } from "@prisma/client"
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

export const verifyCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
      await prisma.company.update({
        where: { id: companyId },
        data: { verified: true },
      });
      const companies = await getAllCompanies()
      const students = await getAllStudents()
  
      res.render('admin/adminDashboard',{
        msg:{
          success:"Company verified successfully",
        },        
        students,companies
        
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Error verifying company', error});
    }
}

export const declineCompany = async(req,res)=>{
  const {companyId} = req.params

  try{
    await prisma.job.deleteMany({
      where:{
        companyId
      }
    });

    await prisma.course.deleteMany({
      where:{
        companyId
      }
    })


    await prisma.company.delete({
      where:{
        id:companyId
      }
    })        
    const companies = await getAllCompanies()
    const students = await getAllStudents()

    res.render('admin/adminDashboard',{
      msg:{
        success:"Company declined successfully",
      },        
      students,companies
      
    })
  }catch(err){
    console.log("Error declined successfully",err)
  }

}
