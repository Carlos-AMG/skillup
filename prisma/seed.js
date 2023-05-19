import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function createOrUpdateArea(areaName) {
  const area = await prisma.area.findFirst({ where: { name: areaName } });

  if (!area) {
    return await prisma.area.create({ data: { name: areaName } });
  }

  return area;
}

async function createCompany(name, email, rfc, address, description,password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const company = await prisma.company.create({
    data: {
      name: name,
      email: email,
      rfc: rfc,
      address: address,
      description: description,
      password:hashedPassword
    },
  });

  return company;
}

async function createJob(title, description, jobType, skills, modality, salary, hoursPerWeek, areaId, companyId) {
  const job = await prisma.job.create({
    data: {
      title: title,
      description: description,
      jobType: jobType,
      skills: skills,
      modality: modality,
      salary: salary,
      hoursPerWeek: hoursPerWeek,
      areaId: areaId,
      companyId: companyId,

    },
  });

  return job;
}

async function createCourse(title, startDate, endDate, description, prerequisites, modality, areaId, companyId) {
  const course = await prisma.course.create({
    data: {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      prerequisites: prerequisites,
      modality: modality,
      areaId: areaId,
      companyId: companyId,
    },
  });

  return course;
}

async function main() {
  try {
    importarDatos();
  } catch (error) {
    console.log(error)
  }finally {
    await prisma.$disconnect();
  }
}
   
  const importarDatos=async()=>{
      const social = await createOrUpdateArea('Social');
      const health = await createOrUpdateArea('Health');
      const agriculture = await createOrUpdateArea('Agriculture');
      const engineering = await createOrUpdateArea('Engineering');

      const company1 = await createCompany(
        'Google',
        'google@gmail.com',
        'ABCDEFGHIJSA',
        'LOS ANGELES',
        'Empresa enfocada en la navegacion',
        'es1234567'
      );
      const company2 = await createCompany(
        'HP',
        'hp@hp.com',
        'AAAAA1234',
        'zapa gdl',
        'We make chips',
        'es123456' 
      );

      const job1 = await createJob(
        ' Jumior Software',
        'Pura programacion',
        'FullTime',
        'C++',
        'Presential',
        50000,
        40,
        social.id,
        company1.id
      );
      const job2 = await createJob(
        'Senior data bases',
        'DB managment',
        'Full Time',
        'SQL',
        'Virtual',
        60000,
        35,
        engineering.id,
        company2.id
      );

      const course1 = await createCourse(
        'Web development',
        new Date('2023-06-01'),
        new Date('2023-07-01'),
        'Learn how to create your own web',
        'Computer, Internet access',
        'Virtual',
        social.id,
        company1.id
      );
      const course2 = await createCourse(
        'SQL course',
        new Date('2023-08-01'),
        new Date('2023-09-01'),
        'Learn how to manage data bases',
        'Computer',
        'Presential',
        engineering.id,
        company2.id
      );

      console.log("Seeded areas: ", social, engineering);
      console.log("Seeded companies: ", company1,company2);
      console.log("Seeded jobs: ", job1, job2);
      console.log("Seeded courses: ", course1, course2);

  }
  const eliminarDatos = async () => {
    try {
      // Array of table names to delete data from
      const tables = ['InterestedJobStudent','InterestedCourseStudent', 'Job','Course','Company','Student'];
  
      // Delete data from each table
      for (const table of tables) {
        await prisma[table].deleteMany();
        console.log(`Datos eliminados de ${table} correctamente`);
      }
  
      console.log('Datos eliminados correctamente');
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  if(process.argv[2]=== "-i"){
    main();
  }

  if(process.argv[2]=== "-d"){
    eliminarDatos();
  }

  