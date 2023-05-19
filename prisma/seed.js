import { PrismaClient } from "@prisma/client";
import { isNullOrUndefined } from "url/util";
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
<<<<<<< HEAD
  const existingEmail = await prisma.company.findUnique({
    where: {
      email: email
    }
=======
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
>>>>>>> eb132bf15caf53f635df215dcde8de4b248c61d0
  });
  const existingRFC = await prisma.company.findUnique({
    where: {
      rfc: rfc
    }
  });
  if (existingEmail || existingRFC) {
    console.log('Company with the same email or RFC already exists.');
  } else {
    const company = await prisma.company.create({
      data: {
        name: name,
        email: email,
        rfc: rfc,
        address: address,
        description: description,
        password: password
      },
    });
    return company;
  }
}

async function createStudent(email, password, name, education) {
  const existingStudent = await prisma.student.findUnique({
    where: {
      email: email
    }
  });
  if (existingStudent) {
    console.log('Student with the same email already exists.');
  } else {
    const student = await prisma.student.create({
      data: {
        email: email,
        password: password,
        fullName: name,
        education: education
      },
    });
    return student;
  }
}

async function createJob(title, description, jobType, skills, modality, salary, hoursPerWeek, areaId, companyId) {
  const existingAreaId = await prisma.area.findUnique({
    where: { area: areaId }
  });
  const existingCompanyId = await prisma.company.findUnique({
    where: { company: companyId}
  });
  if (existingAreaId || existingCompanyId) {
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
  } else {
    console.log('Job with the area or company doesnt exists.');
  }
}

async function createCourse(title, startDate, endDate, description, prerequisites, modality, areaId, companyId) {
  const existingAreaId = await prisma.area.findUnique({
    where: { area: areaId }
  });
  const existingCompanyId = await prisma.company.findUnique({
    where: { company: companyId}
  });
  if (existingAreaId || existingCompanyId) {
    console.log(existingAreaId,existingCompanyId)
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
  } else {
    console.log('Course with the area or company doesnt exists.');
  }
}

async function main() {
<<<<<<< HEAD
  const social = await createOrUpdateArea('Social');
  const health = await createOrUpdateArea('Health');
  const agriculture = await createOrUpdateArea('Agriculture');
  const engineering = await createOrUpdateArea('Engineering');

  const student1 = await createStudent(
    'mariadelcarmen@gmail.com',
    'Maria12!',
    'Maria del Carmen',
    'Tecmilenio'
  );

  const student2 = await createStudent(
    'pablo43delaCruz@hotmail.com',
    'contraseÑa@90!',
    'Pablo de la Cruz',
    'CUCEI'
  );

  const company1 = await createCompany(
    'Google',
    'google@gmail.com',
    'ABCDEFGHIJSA',
    'LOS ANGELES',
    'Empresa enfocada en la navegacion',
    'Es1234567'
  );
  const company2 = await createCompany(
    'HP',
    'hp.corp@hp.mx',
    'AAAAA1234',
    'zapa gdl',
    'We make chips',
    'Es123456' 
  );

  if (company1 === undefined || company2 ===undefined) {
    console.log('Companies dont exists.');
    return;
  }
  
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
  console.log("Seeded companies: ", student1, student2);
  console.log("Seeded companies: ", company1,company2);
  console.log("Seeded jobs: ", job1, job2);
  console.log("Seeded courses: ", course1, course2);
=======
  try {
    importarDatos();
  } catch (error) {
    console.log(error)
  }finally {
    await prisma.$disconnect();
>>>>>>> eb132bf15caf53f635df215dcde8de4b248c61d0
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

  