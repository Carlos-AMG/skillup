import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { getAllAreas, getAllJobs} from "../helpers/utils.js";

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
export const getJobCards = async (req, res) => {
    const { page = 1, limit = 2 } = req.query;
  
    try {
      const jobs = await getAllJobs(parseInt(page), parseInt(limit));
      res.json(jobs);
    } catch (error) {
      console.error('Error in getJobCards controller:', error);
      res.status(500).send('Error fetching job cards');
    }
  };
  

  
export const getJobDetails = async (req, res) => {
    const { jobId } = req.params;
  
    try {
      const jobDetails = await prisma.job.findUnique({
        where: {
          id: jobId,
        },
        include: {
          company: true,
          area: true,
        },
      });
  
      if (!jobDetails) {
        res.status(404).json({ message: 'Job not found' });
        return;
      }
  
      res.status(200).json(jobDetails);
    } catch (error) {
      console.error('Error fetching job details:', error);
      res.status(500).json({ message: 'Error fetching job details' });
    }
  };
  