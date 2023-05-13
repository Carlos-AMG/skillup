import { PrismaClient } from "@prisma/client"
import { getAllAreas ,parseDate} from "../helpers/utils.js";
const prisma = new PrismaClient();


//Render

export const getOffersPage = async (req,res) =>{

    try {
        const areas = await getAllAreas();
        res.render('companies/offers',{
            areas,
            pagina:"Offers",
        })
      } catch (error) {
        console.error('Error while calling getAllAreas:', error);
        res.send(500).send('internal server error');
      }
    
    
}

export const getProfilePage = async (req,res) => {
    res.render('companies/login',{
        areas,
        pagina:"Offers"
    })
}

export const getSkillers= async(req,res)=>{
    
    try {
        let skillers = await prisma.interestedJobStudent.findMany({
            include:{
                student:true,
                job:true,
            }
        })
    
        ///-console.log(skillers)
        res.render('companies/skillers',{
            pagina:"Skillers",
            skillers
        })

    } catch (error) {
        console.log(error)
    }

}

export const getDashboardPage = async (req,res,next)=>{
    try {
        const areas = await getAllAreas();
        res.render('companies/dashboard',{
            userType:"companies",
            areas,
            pagina:"Dashboard",
            companyId: req.user.id
        })
      } catch (error) {
        console.error('Error while calling getAllAreas:', error);
        res.send(500).send('internal server error');
      }

}
//API
export const createJob = async (req,res)=>{
    try{
        const {salary,hoursPerWeek,...restOfBody} = req.body
        console.log('Company id: ', req.user.id)

        const newJob = await prisma.job.create({
            data:{
                companyId:req.user.id,
                ...restOfBody,
                salary: parseInt(salary),
                hoursPerWeek: parseInt(hoursPerWeek),
            }
        })
        console.log(newJob)

        req.flash('success', 'Job successfully created!');
        res.redirect('/companies/dashboard');
    }catch(error){
        console.log(error)
        res.status(500).send("Error in creating the job")
    }

}

export const createCourse = async (req,res)=>{
    try{
        const {startDate,endDate ,...restOfBody} = req.body
        const newCourse = await prisma.course.create({
            data:{
                companyId:req.user.id,
                ...restOfBody,
                startDate: parseDate(startDate),
                endDate: parseDate(endDate)
            }
        })

        req.flash('success', 'Course successfully created!');
        res.redirect('/companies/dashboard');
    }catch(error){
        console.log(error)
        res.status(500).send("Error in creating the course")
    }

}

