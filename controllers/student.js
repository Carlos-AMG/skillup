import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { getAllAreas, getAllOffers} from "../helpers/utils.js";

export const getProfilePage = async (req,res)=>{
    
    res.render('students/profile');
}

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

export const getUpsPage = async (req,res) => {
    res.render('students/my-ups')
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
  