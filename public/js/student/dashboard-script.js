const offerSection = document.querySelector("#offers-section");
const descriptionSection = document.querySelector(".description-section");

const filterJobCourseSelect = document.querySelector("#filter-job-course");
const filterAreaSelect = document.querySelector("#filter-area");

let currentPage = 1;
const limit = 5;




let currentFilterJobCourse = filterJobCourseSelect.value;
let currentFilterArea = filterAreaSelect.value === "all" ? null : filterAreaSelect.value;


const clearOffers = () => {
  offerSection.innerHTML = "";
};


filterJobCourseSelect.addEventListener("change", (event) => {
  currentFilterJobCourse = event.target.value;
  clearOffers();
  currentPage = 1;
  fetchOffers();
});

filterAreaSelect.addEventListener("change", (event) => {
  currentFilterArea = event.target.value;
  clearOffers();
  currentPage = 1;
  fetchOffers();
});

const fetchOffers = async () => {
  try {
    const response = await fetch(
      `api/offer-cards/${currentFilterJobCourse}?page=${currentPage}&limit=${limit}&areaId=${currentFilterArea}`
    );
    const offers = await response.json();
    console.log(offers);
    offers.forEach((offer) => {
      const offerCard = document.createElement("div");
      offerCard.classList.add("offer-card");
      offerCard.innerHTML = `
                <h3>${offer.title}</h3>
                <p>Company: ${offer.company.name}</p>
                <p>Area: ${offer.area.name}</p>
                <hr>
            `;

      offerCard.addEventListener("click", () => {
        fetchOfferDetails(offer.id);
      });

      offerSection.appendChild(offerCard);
    });

    currentPage += 1;
  } catch (error) {
    console.error("Error fetching offers:", error);
  }
};


const fetchOfferDetails = async (offerId) => {
  try {
    const response = await fetch(`api/offer-details/${currentFilterJobCourse}/${offerId}`);
    const offerDetails = await response.json();
    let infoOffer ;
    
    if(currentFilterJobCourse == "job"){
      infoOffer = `
        <h2>${offerDetails.title}</h2>
        <p>Company: ${offerDetails.company.name}</p>
        <p>Area: ${offerDetails.area.name}</p>
        <p>Description: ${offerDetails.description}</p>
        <p>Job Type: ${offerDetails.jobType}</p>
        <p>Skills: ${offerDetails.skills}</p>
        <p>Modality: ${offerDetails.modality}</p>
        <p>Salary: ${offerDetails.salary}</p>
        <p>Hours per week: ${offerDetails.hoursPerWeek}</p>
      `;
    }else{
      infoOffer = `
      <h2>${offerDetails.title}</h2>
      <p>Company: ${offerDetails.company.name}</p>
      <p>Area: ${offerDetails.area.name}</p>
      <p>Description: ${offerDetails.description}</p>
      <p>Prerequisites: ${offerDetails.prerequisites || 'None'}</p>
      <p>Modality: ${offerDetails.modality}</p>
      <p>Start Date: ${new Date(offerDetails.startDate).toLocaleDateString()}</p>
      <p>End Date: ${new Date(offerDetails.endDate).toLocaleDateString()}</p>
    `;
    }
    descriptionSection.innerHTML = infoOffer;
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

offerSection.addEventListener("scroll", () => {
  if (offerSection.offsetHeight + offerSection.scrollTop >= offerSection.scrollHeight) {
    fetchOffers();
  }
});

// Load the initial set of jobs.
fetchOffers();
