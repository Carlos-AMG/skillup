import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getAllAreas= async () => {
    
        const areas = await prisma.area.findMany();
        return areas;
    
}

const parseDate = (dateString) => {
    return new Date(dateString);
  };
  

//Render

export const getOffersPage = async (req,res) =>{

    try {
        const areas = await getAllAreas();
        res.render('companies/offers',{
            areas,
            pagina:"Offers",
            id: req.user.id
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

//API
export const createJob = async (req,res)=>{
    try{
        const {salary,hoursPerWeek,...restOfBody} = req.body
        const newJob = await prisma.job.create({
            data:{
                companyId:req.user.id,
                ...restOfBody,
                salary: parseInt(salary),
                hoursPerWeek: parseInt(hoursPerWeek),
            }
        })

        res.status(201).json(newJob)
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

        res.status(201).json(newCourse)
    }catch(error){
        console.log(error)
        res.status(500).send("Error in creating the course")
    }

}