
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllAreas = async () => {
  const areas = await prisma.area.findMany();
  return areas;
};

export const getAllCompanies = async () => {
  const companies = await prisma.company.findMany()
  return companies
}

export const getAllStudents = async () => {
  const students = await prisma.student.findMany()
  return students
}

export const parseDate = (dateString) => {
  return new Date(dateString);
};

export const checkIfUserLikedJob = async (userId, jobId) => {
  const interestedJob = await prisma.interestedJobStudent.findFirst({
    where: {
      studentId: userId,
      jobId: jobId,
    }
  })
  return interestedJob
}

export const checkIfUserLikedCourse = async (userId, courseId) => {
  const interestedCourse = await prisma.interestedCourseStudent.findFirst({
    where: {
      studentId: userId,
      courseId: courseId,
    }
  })
  return interestedCourse
}

/*
export const getAllOffers = async (offerType,areaId,page, limit) => {
    try {
      const where = {};

      if (areaId) {
        where.areaId = areaId;
      }
      const offers = await prisma[offerType].findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        include: {
            area: {
              select: {
                name: true,
              },
            },
            company: {
              select: {
                name: true,
              },
            },
          },
      });

      return offers;
    } catch (error) {
      console.error('Error fetching offers:', error);
      throw error;
    }
  };
  */


