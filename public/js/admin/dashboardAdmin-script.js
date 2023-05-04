window.onload = () => {
    const filterAreaSelect = document.querySelector("#filter-company-student")
    const companiesList = document.querySelector("#companies-list")
    const studentsList = document.querySelector("#students-list")

    filterAreaSelect.addEventListener('change', () => {
        const selectedOption = filterAreaSelect.value;
        // console.log(`Selected option: ${selectedOption}`);
        if (selectedOption === "company"){
            companiesList.style.display = "block"
            studentsList.style.display = "none"
        }else if (selectedOption === "student") {
            companiesList.style.display = "none"
            studentsList.style.display = "block"
        }
    });
}
