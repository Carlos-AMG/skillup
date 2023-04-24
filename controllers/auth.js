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
  
    const successRedirect = `/${userType}/dashboard`;
    const failureRedirect = `/${userType}/login`;
  
    passport.authenticate(`${userType}-local`, {
      successRedirect,
      failureRedirect,
    })(req, res, next);
  };

  //SignUp handlers
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    const userType = req.params.userType;

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
        if (err) throw err;
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
