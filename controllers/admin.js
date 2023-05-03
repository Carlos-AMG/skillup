import {getAllCompanies, getAllStudents} from "../helpers/utils.js";
import path from 'path';
import fs from 'node:fs/promises';


export const getDashboardPage = async (req,res) => {
    const {password} = req.params

    if (password === "admin"){
        const companies = await getAllCompanies()
        const students = await getAllStudents()
        console.log(companies)
        console.log(students)
        res.render("admin/adminDashboard", {companies,students})

    }else{
        console.log("hola")
        res.render("admin/error")
    }
}
