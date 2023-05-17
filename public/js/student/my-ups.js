
const offerSection = document.querySelector("#offers-section");
const descriptionSection = document.querySelector(".description-section");


const elems = {
    offerSection: document.querySelector("#offers-section"),
    descriptionSection: document.querySelector(".description-section"),
    filterJobCourseSelect: document.querySelector("#filter-job-course"),
    filterAreaSelect: document.querySelector("#filter-area"),
  };
  
  const state = {
    currentPage: 1,
    limit: 10,
    userType: "students",
    currentFilterJobCourse: elems.filterJobCourseSelect.value,
    currentFilterArea: elems.filterAreaSelect.value === "all" ? null : elems.filterAreaSelect.value,
  };
  
  const clearOffers = () => elems.offerSection.innerHTML = "";
  
  const updateFilterAndFetchOffers = (updateFunc) => (event) => {
    updateFunc(event.target.value);
    clearOffers();
    state.currentPage = 1;
    fetchOffers();
  };
  
  elems.filterJobCourseSelect.addEventListener("change", updateFilterAndFetchOffers(value => state.currentFilterJobCourse = value));
  elems.filterAreaSelect.addEventListener("change", updateFilterAndFetchOffers(value => state.currentFilterArea = value));
  
  const createOfferCard = ({ id, title, company, area }) => {
    const offerCard = document.createElement("div");
    offerCard.classList.add("offer-card", "card");
    offerCard.innerHTML = `<h3>${title}</h3>`;
    //<p>Company: ${company.name}</p><p>Area: ${area.name}</p>
    offerCard.addEventListener("click", () => fetchOfferDetails(id));
    return offerCard;
  };
  
  const fetchOffers = async () => {
    try {
    
      const url = `/students/api/interest-offers/${state.currentFilterJobCourse}?page=${state.currentPage}&limit=${state.limit}&areaId=${state.currentFilterArea}`;
      const response = await fetch(url);
      const offers = await response.json();
      offers.forEach(offer => elems.offerSection.appendChild(createOfferCard(offer)));
      state.currentPage += 1;
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };
  
  
  
  elems.offerSection.addEventListener("scroll", () => {
    if (elems.offerSection.offsetHeight + elems.offerSection.scrollTop >= elems.offerSection.scrollHeight) {
      fetchOffers();
    }
  });
  
  
  
  
  const generateOfferDetailsHTML = (offerDetails) => {
    const isJob = state.currentFilterJobCourse === "job";
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
        <span class="font-normal"> ${new Date(offerDetails.startDate).toLocaleDateString()}</span>
      </p>
      <p class=" font-extrabold text-2xl py-2">Start Date: 
        <span class="font-normal"> ${new Date(offerDetails.endDate).toLocaleDateString()}</span>
      </p>
    `;
  
   

  
      const expressDisinterestForm =  `
        <form class="py-2" id="express-desinterest-form" method="POST" action="/students/api/express-disinterest/${state.currentFilterJobCourse}/${offerDetails.id}">
          <input type="submit" value="Down" class="px-5 bg-red-500 text-black uppercase hover:bg-red-700 font-bold py-3 cursor-pointer rounded-md">
        </form>
      ` ;
    
    
      return commonInfo + jobInfo + expressDisinterestForm  ;
    
  };
  
  const fetchOfferDetails = async (offerId) => {
    try {
      const response = await fetch(`/api/offer-details/${state.currentFilterJobCourse}/${offerId}`);
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
  
  const deleteOffer = () =>{
      document.getElementById('deleteButton').addEventListener('click', function() {
        const offerId = this.getAttribute('data-offer-id');
        const offerType = this.getAttribute('data-offer-type');
        axios.delete('delete-offer/' + offerType + '/' + offerId)
            .then(function (response) {
                // handle success
                console.log(response);
               
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert('Failed to delete');
            });
            location.href = "/companies/dashboard"
    });
  }