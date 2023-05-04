import {getAllCompanies, getAllStudents} from "../helpers/utils.js";

export const getDashboardPage = async (req,res) => {
    const {password} = req.params

    if (password === "admin"){
        const companies = await getAllCompanies()
        const students = await getAllStudents()
        res.render("admin/adminDashboard", {companies, students})

    }else{
        res.render("admin/error")
    }
}
