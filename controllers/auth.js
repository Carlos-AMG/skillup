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
    const {rfc} = req.body
    const errors = validationResult(req);

    const userType = req.params.userType;
    let existingAccount;
    let repeatedRFC;

    // check if email has already been used in either students or companies
    
    if (userType === "companies"){
      existingAccount = await prisma.company.findFirst({
        where: {
          email
        }
      });
      repeatedRFC = await prisma.company.findFirst({
        where: {
          rfc
        }
      });
    }else if (userType === "students"){
      existingAccount = await prisma.student.findFirst({
        where: {
          email
        }
      })
    }
    console.log(existingAccount, repeatedRFC)
    let bool = false
    if (existingAccount){
      errors.errors.push({
        type: 'field',
        value: '',
        msg: `Couldnt create user, ${email} has already been used`,
        path: 'email',
        location: 'body',
      })
      bool = true
    }
    if (repeatedRFC){
      errors.errors.push({
        type: 'field',
        value: '',
        msg: `Couldnt create user, ${rfc} rfc has already been used`,
        path: 'rfc',
        location: 'body',
      })
      bool = true
    }

    if (!errors.isEmpty()) {
      // console.log(errors.array())
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


