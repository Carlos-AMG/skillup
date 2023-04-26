import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getProfilePage = async (req,res) => {
    console.log(req.user.id)
    let id = req.user.id;
    const student = await prisma.student.findUnique({
        where:{
            id
        }
    });
    res.render("students/profile",{student,pages:[
        'dashboard', 'ups', 'edit_profile', 'logout'
    ]})
} 

export const getDashboardPage = async (req,res)=>{
    res.render("students/dashboard",{student,pages:[
        'dashboard', 'ups', 'edit_profile', 'logout'
    ]})
}