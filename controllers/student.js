import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { validationResult,check } from "express-validator";
import { generarId } from "../helpers/token.js";
import { emailSignUp } from "../helpers/emails.js";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const getProfilePage = async (req,res) => {
    let id = req.user.id
    const student = await prisma.student.findUnique({
        id
    });
    res.render("students/profile",{student})
}

const logInStudent = (req,res)=>{
    res.render('partials/login',{
        type:"Students",
        pagina:"LogIn"
    })
}

const signUpStudent = (req,res)=>{
    res.render('students/signup',{
        type:"Students",
        pagina: 'SignUp'
    })
}

const formularioOlvidePassword = (req,res)=>{
    res.render('partials/olvide-password',{
        type:"Students",
        pagina: 'Forgotten Password?'
    })
}

const register =async (req,res)=>{
    //Validacion
    await check('fullName').notEmpty().withMessage('Name is required').run(req)
    await check('email').isEmail().withMessage("That's not an email").run(req)
    await check('education').notEmpty().withMessage('Education is required').run(req)
    await check('password').isLength({min:6}).withMessage('The password must have a minimum of 6 characters').run(req)



    let result = validationResult(req)
 

    const {fullName,email,education,password,profileImage,cv,link} = req.body
    //Verifica que el resultado no este vacio
    if(!result.isEmpty()){
        return res.render('students/signup',{
            pagina:'SignUp',
            type:"Students",
            errors: result.array(),
            student:{
                name:fullName,
                email,
                education,
                profileImage,
                cv,
                link
            }
        })
    }
    //Verrificar que el usuario no este registrado
    
    const existStudent = await prisma.Student.findUnique({
        where:{
            email
        }
    })

    if(existStudent){
        return res.render('students/signup',{
            pagina:'SignUp',
            type:"Students", 
            errors: [{msg:'User already registered'}],
            student:{
                name:fullName,
                email,
                education
            }
        })
    }
    //Hashing password
    prisma.$use(async (params, next) => {
        if (params.model === 'Student' && params.action === 'create') {
          const password = params.args.data.password;
          const hashedPassword = await bcrypt.hash(password, 10);
          params.args.data.password = hashedPassword;
        }
      
        return next(params);
      });
      
    //Almacenar un nuevo usuario 
    const student = await prisma.Student.create(
        {data:{
            fullName,
            email,
            password,
            education,
            profileImage,
            cv,
            link,
            token: generarId()
        }}
    )
    //Envia email de confirmacion

    emailSignUp({
        fullName: student.fullName,
        email:student.email,
        token:student.token
    })
    //Mostrar msj de confirmacion
    res.render('partials/mensaje',{
        type:'Students',
        pagina:'Account created successfully',
        message: "We've sent a confirmation email"
    })

}
//Comprueba la cuenta
const confirm =async (req,res,next)=>{
    
    const {token} = req.params
    const studentFind = await prisma.student.findUnique({
        where: {
          token
        }
      })
    if(!studentFind){
        return res.render('partials/confirm-account',{
            pagina:"Confirm Account",
            type:"Students",
            mensaje: "Error comfirming account",
            error:true
        })
    }
    const updatedUser = await prisma.student.update({
        where:{token},
        data: {
            verified:true,
            token:null 
        }
    })

    res.render('partials/confirm-account',{
        pagina:"Welcome to SkillUp",
        type:"Students",
        mensaje: "Your account has been confirmed",
        error:false
    })
}

const postSignIn = (req, res, next) => {
    const successRedirect = `/student/profile`;
    const failureRedirect = `/student/login`;
  
    passport.authenticate(`student-local`, {
      successRedirect,
      failureRedirect,
    })(req, res, next);
  };

export{
    logInStudent,
    signUpStudent,
    register,
    confirm,
    formularioOlvidePassword,
    postSignIn
} 