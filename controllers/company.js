import { PrismaClient } from "@prisma/client"
import { getAllAreas ,parseDate} from "../helpers/utils.js";
const prisma = new PrismaClient();
import nodemailer from "nodemailer"


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
    let {title} = await prisma[offerType].findUnique({
        where:{id:offerId},
        select:{
            title:true,
        }
    })  
    console.log('skillers ', skillers)
    res.render('companies/skillers',{skillers,title})
   }catch(err){
    console.error(err)
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
        const formData = await prisma[offerType].findUnique({
            where:{
                id:offerId,
            }
        })

        res.render(`companies/edit-${offerType}`,{formData,areas})
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
      const { salary, hoursPerWeek,  ...restOfBody } = req.body;
  
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
      
        if (offerType === 'job') {

            await prisma.interestedJobStudent.deleteMany({
                where: { jobId: offerId }
            });


            await prisma.job.delete({
                where: { id: offerId },
            });
        }
    
        else if (offerType === 'course') {
      
            await prisma.interestedCourseStudent.deleteMany({
                where: { courseId: offerId }
            });

            await prisma.course.delete({
                where: { id: offerId },
            });
        } else {
            return res.status(400).json({ error: "Invalid offer type" });
        }

        req.flash('success', 'Offer successfully deleted!');
        res.redirect('/companies/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error in deleting the offer");
    }
}



export const  sendContactEmail =async (req, res) => {
  const { studentName, studentEmail } = req.params;
  let {offerName} = req.body
    let company;
  try{
     company = await prisma.company.findUnique({
        where:{
            id:req.user.id
        }
    })
  }catch(err){
    console.log(err)
  }
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from:company.email,
    to: studentEmail ,
    subject: 'Contact email',
    html:`
            <p>Hi ${studentName}! </p>
            <p>Hi ${studentName}, we saw your resume and we want to schedule an interview for the ${offerName}
            </p>`,

  };
  //--------------------------------

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    
    req.flash('success','Email sent successfully')
    res.redirect('/companies/dashboard');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
};

