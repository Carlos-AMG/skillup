
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllAreas = async () => {
  const areas = await prisma.area.findMany();
  return areas;
};

export const parseDate = (dateString) => {
  return new Date(dateString);
};

export const getAllJobs = async (page, limit) => {
    try {
      const jobs = await prisma.job.findMany({
        skip: (page - 1) * limit,
        take: limit,
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
      console.log(jobs)
      return jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  };
  


