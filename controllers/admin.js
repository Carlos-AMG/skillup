import {getAllCompanies} from "../helpers/utils.js";
import path from 'path';
import fs from 'node:fs/promises';


export const getDashboardPage = async (req,res) => {
    const {password} = req.params

    if (password === "admin"){
        const companies = await getAllCompanies()
        console.log(companies)
        res.render("admin/adminDashboard", {companies})

    }else{
        console.log("hola")
        res.render("admin/error")
    }
}
