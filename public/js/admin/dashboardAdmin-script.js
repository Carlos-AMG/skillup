
window.onload = () => {
    const filterAreaSelect = document.querySelector("#filter-company-student")
    const companiesList = document.querySelector("#companies-list")
    const studentsList = document.querySelector("#students-list")

    companiesList.style.display = "block"
    studentsList.style.display = "none"

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
/*
    companiesList.addEventListener("click", (event) => {
        // we'll use event capturing so that all buttons inside companiesList have click event listener 
        if (event.target.classList.contains("verify")){
            // create post request to /admin/
            fetch("/admin", {
                method: "POST",
                body: JSON.stringify({companyId: event.target.dataset.companyId}),
                headers: {"content-type" : "application/json"}
            }).then (response => response.json()).then(data => { if (data.success) { 
                event.target.parentElement.remove()
            }}).catch(err => console.log('This is the error', err))
        }
    })*/
}


