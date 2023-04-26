// import bcrypt from "bcrypt";
// import passport from "passport";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import { validationResult } from "express-validator";

// //Aux
// const getSingularForm = (userType) => {
//     return userType === "students" ? "student" : "company";
//   };
export const main = (req,res)=>{
    res.render('layout/main',{
        pagina:"Main"
    })
}
// //Render
// export const signInPage= (req,res)=>{
//     const type = req.params.userType; 
//     res.render('partials/login',{
//         type,
//         pagina:"LogIn"
//     })
// }

// export const signUpPage = (req,res)=>{

//     const type = req.params.userType;

//     res.render(`${type}/signup`,{
//         type,
//         pagina: 'SignUp'
//     })
// }


// // SignIn handlers

// export const postSignIn = (req, res, next) => {
//     const userType = req.params.userType;
  
//     const successRedirect = `/${userType}/profile`;
//     const failureRedirect = `/${userType}/login`;
  
//     passport.authenticate(`${userType}-local`, {
//       successRedirect,
//       failureRedirect,
//     })(req, res, next);
//   };


// export const forgotPassword = (req,res)=>{
//     const type = req.params.userType;
//     res.render('partials/olvide-password',{
//         type,
//         pagina: 'Forgotten Password?'
//     })
// }
