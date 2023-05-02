
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllAreas = async () => {
  const areas = await prisma.area.findMany();
  return areas;
};

export const parseDate = (dateString) => {
  return new Date(dateString);
};

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
  


