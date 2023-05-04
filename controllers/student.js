import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { getAllAreas, getAllOffers} from "../helpers/utils.js";
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
  try { let myUps=[]
    const myUpsCourse= await prisma.InterestedCourseStudent.findMany({
      where:{
        studentId:req.user.id
      }
      ,include: {
        course:true
      }
    })
    const myUpsJobs= await prisma.InterestedJobStudent.findMany({
      where:{
        studentId:req.user.id
      }
      ,include: {
        job:true
      }
    })
    console.log(myUpsCourse)
    console.log(myUpsJobs)
    res.render('students/my-ups',{
      pagina: 'My Ups',
      myUpsCourse,
      myUpsJobs
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
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
  
  export const postInterest = async (req, res, next) => {
    const { offerType, offerId } = req.params;
    let interestType, data;
  
    if (offerType === "job") {
      interestType = "InterestedJobStudent";
      data = {
        studentId: req.user.id,
        jobId: offerId,
      };
    } else if (offerType === "course") {
      interestType = "InterestedCourseStudent";
      data = {
        studentId: req.user.id,
        courseId: offerId,
      };
    } else {
      res.status(400).json({ message: "Invalid offer type" });
      return;
    }
  
    try {
      const interest = await prisma[interestType].create({
        data,
      });
      console.log(interest)
      res.status(201).json({ message: "Interest registered", interest });
    } catch (err) {
      console.error("Error while registering interest:", err);
      res.status(500).json({ message: "Error while registering interest" });
    }
  };

  
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
