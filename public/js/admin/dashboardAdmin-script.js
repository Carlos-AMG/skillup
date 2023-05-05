window.onload = () => {
    const filterAreaSelect = document.getElementById("filter-company-student");
    const companiesList = document.getElementById("companies-list");
    const studentsList = document.getElementById("students-list");
  
    function updateDisplay() {
      const selectedOption = filterAreaSelect.value;
      companiesList.style.display = selectedOption === "company" ? "block" : "none";
      studentsList.style.display = selectedOption === "student" ? "block" : "none";
    }
  
    filterAreaSelect.addEventListener("change", updateDisplay);
  
    updateDisplay(); // Call once to set the initial display state
  };
  