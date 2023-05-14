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
export const getSkillersPage= async(req,res)=>{
    
   const {offerType,offerId} = req.params;
   try{
    let skillers;
    if(offerType == "job"){
         skillers = await prisma.interestedJobStudent.findMany({
            where:{
                jobId:offerId
            },
            include:{
                student:true
            }
        })
    }else{
         skillers = await prisma.interestedCourseStudent.findMany({
            where:{
                courseId:offerId
            },
            include:{
                student:true
            }
        })
    }

    res.render('companies/skillers',{skillers})
   }catch(err){
    console.log(err)
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

export const getEditFormPage = async (req,res) =>{
    const {offerType,offerId} = req.params;

    try{
        const areas = await getAllAreas();
        const offer = await prisma[offerType].findUnique({
            where:{
                id:offerId,
            }
        })

        res.render(`companies/edit-${offerType}`,{offer,areas})
    }catch(err){
        console.log(err)
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

export const updateJob = async (req, res) => {
    try {
      const { id } = req.params;
      const { salary, hoursPerWeek, ...restOfBody } = req.body;
  
      const updatedJob = await prisma.job.update({
        where: { id },
        data: {
          ...restOfBody,
          salary: parseInt(salary),
          hoursPerWeek: parseInt(hoursPerWeek),
        },
      });
  
      req.flash('success', 'Job successfully updated!');
      res.redirect('/companies/dashboard');
    } catch (error) {
      console.log(error);
      res.status(500).send("Error in updating the job");
    }
  };
  
  export const updateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { startDate, endDate, ...restOfBody } = req.body;
  
      const updatedCourse = await prisma.course.update({
        where: { id },
        data: {
          ...restOfBody,
          startDate: parseDate(startDate),
          endDate: parseDate(endDate),
        },
      });
  
      req.flash('success', 'Course successfully updated!');
      res.redirect('/companies/dashboard');
    } catch (error) {
      console.log(error);
      res.status(500).send("Error in updating the course");
    }
  };
  
  export const deleteOffer = async (req, res) => {
    const { offerType, offerId } = req.params;

    try {
        // Check if the offer type is valid
        if (offerType !== 'job' && offerType !== 'course') {
            return res.status(400).json({ error: 'Invalid offer type' });
        }

        // Check if the offer belongs to the authenticated company
        const offer = await prisma[offerType].findUnique({ where: { id: offerId } });
        if (!offer) {
            return res.status(404).json({ error: 'Offer not found' });
        }
        if (offer.companyId !== req.user.id) {
            return res.status(403).json({ error: 'You do not have permission to delete this offer' });
        }

        // Delete the offer
        await prisma[offerType].delete({ where: { id: offerId } });

        req.flash('success', 'Offer successfully deleted!');
        res.redirect('/companies/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error in deleting the offer");
    }
};
