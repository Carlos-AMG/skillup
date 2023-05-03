const filterAreaSelect = document.querySelector("#filter-company-student");

let currentFilterCompanyStudent = filterJobCourseSelect.value;
let currentFilterArea = filterAreaSelect.value === "all" ? null : filterAreaSelect.value;

filterJobCourseSelect.addEventListener("change", updateFilterAndFetchOffers((value) => currentFilterCompanyStudent = value));

