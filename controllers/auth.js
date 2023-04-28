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
    const successPage = userType == "student" ? "dashboard" : "offers"; 
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


/*
import crypto from "crypto";
import nodemailer from "nodemailer";
export const postForgotPassword = async (req, res) => {
  const { email } = req.body;
  const userType = req.params.userType;
  const singularForm = getSingularForm(userType);

  try {
    const user = await prisma[singularForm].findUnique({ where: { email } });

    if (!user) {
      return res.status(400).send("Email not found");
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiration = Date.now() + 3600000; // 1 hour

    await prisma[singularForm].update({
      where: { email },
      data: { resetPasswordToken: token, resetPasswordExpires: expiration },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) requested a password reset for your account.
        Please click on the following link, or paste it into your browser to complete the password reset process:
        http://${req.headers.host}/${userType}/reset-password/${token}
        If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error sending the password reset email");
      }
      res.status(200).send("An email has been sent with further instructions");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the forgot password request");
  }
};*/

