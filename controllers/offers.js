
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllOffers = async (req, res, next) => {
    try {
      let { offerType } = req.params;
      const { areaId, companyId  ,page = 1, limit = 10} = req.query;

      const where = {};

      
        if (areaId) {
            where.areaId = areaId;
        }
        
        if (companyId != "null") {
            where.companyId = companyId;

        }
      
      let offers = []
      
      if (offerType === "all"){
        offers.push(...(await prisma.job.findMany({
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
        })))
        offers.push(...(await prisma.course.findMany({
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
        })))
      }else {
        offers = await prisma[offerType].findMany({
          skip: (page - 1) * limit,
          take: parseInt(limit),
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
      }

      res.status(200).json(offers);

    } catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).json({ error: 'An error occurred while fetching offers.' });
    }
}


export const getOfferDetails = async (req, res) => {
    const { offerId,offerType } = req.params;
  
    try {

      let offerDetails = []
      if (offerType === "all"){
        offerDetails.push((await prisma.job.findUnique({
          where: {
            id: offerId
          }, include: {
            company: true,
            area: true
          }
        })))
        offerDetails.push((await prisma.course.findUnique({
          where: {
            id: offerId
          }, include: {
            company: true,
            area: true
          }
        })))

        offerDetails = offerDetails.flatMap(details => details);
        console.log(offerDetails) 
        return res.status(200).json(offerDetails);
      }

      offerDetails = await prisma[offerType].findUnique({
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