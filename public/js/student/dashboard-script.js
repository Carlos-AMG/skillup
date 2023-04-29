const jobContainer = document.querySelector("#offers-section");
const descriptionSection = document.querySelector(".description-section");

let currentPage = 1;
const limit = 2;

const fetchJobs = async () => {
  try {
    const response = await fetch(
      `api/job-cards?page=${currentPage}&limit=${limit}`
    );
    const jobs = await response.json();
    console.log(jobs);
    jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card");
      jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p>Company: ${job.company.name}</p>
                <p>Area: ${job.area.name}</p>
            `;

      jobCard.addEventListener("click", () => {
        fetchJobDetails(job.id);
      });

      jobContainer.appendChild(jobCard);
    });

    currentPage += 1;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

const fetchJobDetails = async (jobId) => {
  try {
    const response = await fetch(`api/job-details/${jobId}`);
    const jobDetails = await response.json();

    descriptionSection.innerHTML = `
      <h2>${jobDetails.title}</h2>
      <p>Company: ${jobDetails.company.name}</p>
      <p>Area: ${jobDetails.area.name}</p>
      <p>Description: ${jobDetails.description}</p>
      <p>Job Type: ${jobDetails.jobType}</p>
      <p>Skills: ${jobDetails.skills}</p>
      <p>Modality: ${jobDetails.modality}</p>
      <p>Salary: ${jobDetails.salary}</p>
      <p>Hours per week: ${jobDetails.hoursPerWeek}</p>
    `;
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

jobContainer.addEventListener("scroll", () => {
  if (jobContainer.offsetHeight + jobContainer.scrollTop >= jobContainer.scrollHeight) {
    fetchJobs();
  }
});

// Load the initial set of jobs.
fetchJobs();
