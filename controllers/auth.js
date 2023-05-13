import bcrypt from "bcrypt";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { validationResult } from "express-validator";

//Aux
const getSingularForm = (userType) => {
    return userType === "students" ? "student" : "company";
  };

//Render
export const signInPage= (req,res)=>{
    const type = req.params.userType;
    
    console.log(type)
    res.render('partials/login',{
        type,
        pagina:"LogIn"
    })
}

export const signUpPage = (req,res)=>{

    const type = req.params.userType;
   
    res.render(`${type}/signup`,{
        type,
        pagina: 'SignUp'
    })
}


// SignIn handlers

export const postSignIn = (req, res, next) => {
    const userType = req.params.userType;
    const successPage = userType == "students" ? "dashboard" : "offers"; 
    const successRedirect = `/${userType}/${successPage}`;
    const failureRedirect = `/${userType}/login`;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array()[0].msg);
      return res.redirect(failureRedirect);
    }
  
    passport.authenticate(`${userType}-local`, {
      successRedirect,
      failureRedirect,
      failureFlash: true,
    })(req, res, next);
  };

  //SignUp handlers
export const registerUser = async (req, res) => {
    const {fullName, email, password} = req.body
    const errors = validationResult(req);
    const userType = req.params.userType;
    
    // console.log(req.params)
    // console.log(req.body)
    console.log(errors)

    if (!errors.isEmpty()) {
      return res.status(422).render(`${userType}/signup`, {
        type: userType,
        pagina: "SignUp",
        errors: errors.array(),
      });
    }
    
    const userTypeSingular = getSingularForm(userType);
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const user = await prisma[userTypeSingular].create({
        data: { ...req.body, password: hashedPassword },
      });
  
      req.login(user, (err) => {
        if (err){
          console.log(err)
          throw err;
        }
        res.redirect(`/${userType}/login`);
      });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al crear la cuenta" });
    }
  };

export const forgotPassword = (req,res)=>{
    const type = req.params.userType;
    res.render('partials/olvide-password',{
        type,
        pagina: 'Forgotten Password?'
    })
}

export const logOut = (req, res, next) =>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};


