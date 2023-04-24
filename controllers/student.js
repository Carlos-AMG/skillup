import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getProfilePage = async (req,res) => {
    let id = req.user.id
    const student = await prisma.student.findUnique({
        id
    });
    res.render("students/profile",{id:req.user.id})
} 