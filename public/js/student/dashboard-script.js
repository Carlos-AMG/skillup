const offerSection = document.querySelector("#offers-section");
const descriptionSection = document.querySelector(".description-section");

const filterJobCourseSelect = document.querySelector("#filter-job-course");
const filterAreaSelect = document.querySelector("#filter-area");

let currentPage = 1;
const limit = 10;

let currentFilterJobCourse = filterJobCourseSelect.value;
let currentFilterArea = filterAreaSelect.value === "all" ? null : filterAreaSelect.value;

const clearOffers = () => {
  offerSection.innerHTML = "";
};

const updateFilterAndFetchOffers = (updateFunc) => {
  return (event) => {
    updateFunc(event.target.value);
    clearOffers();
    currentPage = 1;
    fetchOffers();
  };
};

filterJobCourseSelect.addEventListener("change", updateFilterAndFetchOffers((value) => currentFilterJobCourse = value));
filterAreaSelect.addEventListener("change", updateFilterAndFetchOffers((value) => currentFilterArea = value));

const createOfferCard = (offer) => {
  const offerCard = document.createElement("div");
  offerCard.classList.add("offer-card");
  offerCard.classList.add("card");
  offerCard.innerHTML = `
    <h3 >${offer.title}</h3>
    <p>Company: ${offer.company.name}</p>
    <p>Area: ${offer.area.name}</p>
  `;
  offerCard.addEventListener("click", () => {
    fetchOfferDetails(offer.id);
  });
  return offerCard;
};

const fetchOffers = async () => {
  try {
    const response = await fetch(
      `api/offer-cards/${currentFilterJobCourse}?page=${currentPage}&limit=${limit}&areaId=${currentFilterArea}`
    );
    const offers = await response.json();

    offers.forEach((offer) => {
      offerSection.appendChild(createOfferCard(offer));
    });

    currentPage += 1;
  } catch (error) {
    console.error("Error fetching offers:", error);
  }
};

const generateOfferDetailsHTML = (offerDetails) => {
  const isJob = currentFilterJobCourse === "job";
  const commonInfo = `
    <h2 class="text-4xl font-bold text-green-500">${offerDetails.title}</h2>
    <p class=" font-extrabold text-2xl py-2">Company: 
      <span class="font-normal"> ${offerDetails.company.name}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Area: 
      <span class="font-normal"> ${offerDetails.area.name}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Description: 
      <span class="font-normal"> ${offerDetails.description}</span>
    </p>
  `;

  const jobInfo = isJob ? `
    <p class=" font-extrabold text-2xl py-2">Job type: 
      <span class="font-normal"> ${offerDetails.jobType}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Skills: 
      <span class="font-normal"> ${offerDetails.skills}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Modality: 
      <span class="font-normal"> ${offerDetails.modality}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Salary: 
      <span class="font-normal"> $${offerDetails.salary}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Hours per week: 
      <span class="font-normal"> ${offerDetails.hoursPerWeek}</span>
    </p>
  ` : `
    <p class=" font-extrabold text-2xl py-2">Prerequisites: 
      <span class="font-normal"> ${offerDetails.prerequisites || 'None'}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Modality: 
      <span class="font-normal"> ${offerDetails.modality}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Start Date: 
      <span class="font-normal"> ${offerDetails.startDate.toLocaleDateString()}</span>
    </p>
    <p class=" font-extrabold text-2xl py-2">Start Date: 
      <span class="font-normal"> ${offerDetails.endDate.toLocaleDateString()}</span>
    </p>
  `;

  const expressInterestForm = `
    <form class="py-2" id="express-interest-form" method="POST" action="api/express-interest/${currentFilterJobCourse}/${offerDetails.id}">
      <input type="submit" value="Up" class="px-5 bg-green-500 text-white uppercase hover:bg-green-700 font-bold py-3 cursor-pointer rounded-md">
    </form>
  `;

  return commonInfo + jobInfo + expressInterestForm;
};

const fetchOfferDetails = async (offerId) => {
  try {
    const response = await fetch(`api/offer-details/${currentFilterJobCourse}/${offerId}`);
    const offerDetails = await response.json();

    const infoOffer = generateOfferDetailsHTML(offerDetails);
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

