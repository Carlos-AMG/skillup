exports.getStudentLogin = (req,res,next) => {
    res.render("partials/login", {name: "student"})
}

exports.getCompanyLogin = (req,res,next) => {
    res.render("partials/login", {name: "company"})
}