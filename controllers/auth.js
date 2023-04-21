// exports.getStudentLogin = (req,res,next) => {
//     res.render("partials/login", {name: "student"})
// }

// exports.getCompanyLogin = (req,res,next) => {
//     res.render("partials/login", {name: "company"})
// }

const main = (req,res)=>{
    res.render('layout/main',{
        pagina:'Main'
    })
}

export default main