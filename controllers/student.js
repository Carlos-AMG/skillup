import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { getAllAreas, checkIfUserLikedJob, checkIfUserLikedCourse} from "../helpers/utils.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProfilePage = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
 
    if (!student) {
      res.status(404).send("Student not found");
      return;
    }
    console.log(student)

    res.render("students/profile", { student,studentId,pagina:"Profile"});
    
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).send("Error fetching student data");
  }
};

export const getDashboardPage = async (req,res) => {
    try {
        const areas = await getAllAreas();
        res.render('students/dashboard',{
            areas,
            pagina:"Dashboard",
        })
      } catch (error) {
        console.error('Error while calling getAllAreas:', error);
        res.send(500).send('internal server error');
      }

}
export const getEditProfilePage = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      res.status(404).send("Student not found");
      return;
    }

    res.render("students/edit-profile", { student });
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).send("Error fetching student data");
  }
};


export const getUpsPage = async (req,res) => {
  try {
    const areas = await getAllAreas();
    res.render('students/my-ups',{
      pagina: 'My Ups',
      areas,
    })
  }  catch (error) {
    console.error('Error while calling getAllAreas:', error);
    res.send(500).send('internal server error');
  }
  
}

//API
export const getOfferCards = async (req, res) => {
    const { page = 1, limit = 2 ,areaId = null} = req.query;
    const {offerType} = req.params;
    try {
      const offers = await getAllOffers(offerType,areaId,parseInt(page), parseInt(limit));
      res.json(offers);
    } catch (error) {
      console.error('Error in getJobCards controller:', error);
      res.status(500).send('Error fetching job cards');
    }
  };
  

  
export const getOfferDetails = async (req, res) => {
    const { offerId,offerType } = req.params;
  
    try {
      const offerDetails = await prisma[offerType].findUnique({
        where: {
          id: offerId,
        },
        include: {
          company: true,
          area: true,
        },
      });
  
      if (!offerDetails) {
        res.status(404).json({ message: 'Offer not found' });
        return;
      }
  
      res.status(200).json(offerDetails);
    } catch (error) {
      console.error('Error fetching offer details:', error);
      res.status(500).json({ message: 'Error fetching offer details' });
    }
  };
  export const postInterest = async (req, res) => {
    try {
        const { offerType, offerId } = req.params;
        
        // Check if the student has already expressed interest
      let obj;
      if (offerType=='job'){
        obj ={
          studentId:req.user.id, jobId: offerId
        }
      }else{
        obj ={
          studentId:req.user.id, courseId: offerId
        }
      }

        const existingInterest = await prisma[`${offerType === 'job' ? 'InterestedJobStudent' : 'InterestedCourseStudent'}`].findFirst({
            where: {
              ...obj
            }
        });

        if (existingInterest) {
          req.flash('error','You have already expressed interest in this offer.')
          return res.redirect('/students/dashboard');

        }

        // Express interest
        console.log("studentId: ",req.user.id)
        const interest = await prisma[`${offerType === 'job' ? 'InterestedJobStudent' : 'InterestedCourseStudent'}`].create({
            data: {
                studentId:req.user.id,
                [`${offerType}Id`]: offerId,
            }
        });
        req.flash('success','Express interest correctly')
        res.redirect('/students/dashboard');

    } catch (error) {
        console.error('Error expressing interest:', error);
        res.status(500).json({ error: 'An error occurred while expressing interest.' });
    }
}





export const postDisinterest = async (req, res, next) => {
  const { offerType, offerId } = req.params;

  try {
    if (offerType === 'job') {
      await prisma.interestedJobStudent.delete({
        where: {
          studentId_jobId: {
            studentId: req.user.id,
            jobId: offerId,
          },
        },
      });
    } else if (offerType === 'course') {
      await prisma.interestedCourseStudent.delete({
        where: {
          studentId_jobId: {
            studentId: studentId,
            courseId: offerId,
          },
          
        },
      });
      
    } else {

      return res.status(400).json({ error: 'Invalid offer type' });
    }
    req.flash('success','Express disnterest correctly')
      res.redirect('/students/dashboard');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while expressing disinterest' });
  }
}
  
export const updateStudentProfile = async (req, res) => {
  const { fullName, education, studentId } = req.body;
  const profileImage = req.files && req.files.profileImage ? req.files.profileImage[0] : undefined;
  const cv = req.files && req.files.cv ? req.files.cv[0] : undefined;

  try {
    let updateData = {
      fullName,
      education,
    };

    if (profileImage) {
      // Obtén la imagen actual del estudiante
      const currentStudent = await prisma.student.findUnique({
        where: { id: studentId },
        select: { profileImage: true },
      });
    
      // Elimina la imagen de perfil anterior si existe
      if (currentStudent.profileImage) {
        const oldImagePath = path.join(__dirname, '..', currentStudent.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    
      updateData.profileImage = `uploads/profile_images/${profileImage.filename}`;
    }

    if (cv) {
      updateData.cv = `uploads/cvs/${cv.filename}`;
    }

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: updateData,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el perfil del estudiante');
  }
};


export const getStudentImage = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    // Lista de extensiones permitidas
    const extensions = ['.jpeg', '.jpg', '.png'];

    // Encuentra una imagen existente con alguna de las extensiones permitidas
    let imagePath;
    for (const ext of extensions) {
      const tempPath = path.join(__dirname, '..', 'uploads', 'profile_images', `${studentId}${ext}`);
      if (fs.existsSync(tempPath)) {
        imagePath = tempPath;
        break;
      }
    }

    if (imagePath) {
      res.sendFile(imagePath);
    } else {
      res.status(404).send('La imagen de perfil no se encuentra');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la imagen de perfil del estudiante');
  }
};


export const getStudentCv = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const cvPath = path.join(__dirname, '..', 'uploads', 'cvs', `${studentId}.pdf`); 

    if (fs.existsSync(cvPath)) {
      res.sendFile(cvPath);
    } else {
      res.status(404).send('El cv no se encuentra');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el cv del estudiante');
  }
};


export const fetchInterestedOffers = async (req, res) => {
  const {  currentFilterJobCourse } = req.params;
  const { page = 1, limit = 10, areaId } = req.query;

  try {
    const skip = (page - 1) * limit;

    if (currentFilterJobCourse === 'job') {
      const jobs = await prisma.interestedJobStudent.findMany({
        where: {
          studentId: req.user.id,
          job: {
            areaId: areaId,
          },
        },
        skip: skip,
        take: parseInt(limit),

        include: {
          job: true,
        },
      });
      console.log(jobs)
      res.json(jobs.map(record => record.job));
    } else if (currentFilterJobCourse === 'course') {
      const courses = await prisma.interestedCourseStudent.findMany({
        where: {
          studentId:req.user.id,
          course: {
            areaId: areaId,
          },
        },
        skip: skip,
        take: limit,
        include: {
          course: true,
          
      },
      });
      console.log(courses)
      res.json(courses.map(record => record.course));
    } else {
      return res.status(400).json({ error: 'Invalid offer type' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching interested offers' });
  }
};

