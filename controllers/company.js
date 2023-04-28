import { PrismaClient } from "@prisma/client";
import passport from "../config/passport.js";
import { validationResult,check } from "express-validator";
import { generarId } from "../helpers/token.js";
import { emailSignUp,emailForgotPassword } from "../helpers/emails.js";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()



export const getDashboardPage = async (req,res)=>{
    res.render("students/dashboard",{student,pages:[
        'dashboard', 'skillers', 'edit_profile', 'logout'
    ]})
  }

const logInCompany = (req,res)=>{
    res.render('partials/login',{
        type:"Companies",
        pagina:"LogIn"
    })
}

const signUpCompany = (req,res)=>{
    res.render('companies/signup',{
        type:"Companies",
        pagina: 'SignUp'
    })
}

const getSkillers = (req, res)=>{
    res.render('companies/skillers',{
        pagina: 'Skillers'
    })
}

const formularioOlvidePassword = (req,res)=>{
    res.render('partials/olvide-password',{
        type:"Companies",
        pagina: 'Forgot Password?'
    })
}

const register =async (req,res)=>{
    //Validacion
    await check('name').notEmpty().withMessage('Name is required').run(req)
    await check('email').isEmail().withMessage("That's not an email").run(req)
    await check('address').notEmpty().withMessage('Address is required').run(req)
    await check('password').isLength({min:6}).withMessage('The password must have a minimum of 6 characters').run(req)
    await check('rfc').isLength({min:13}).withMessage('RFC must have 13 characters').run(req)



    let result = validationResult(req)
 

    const {fullName,email,education,password,profileImage,cv,link} = req.body
    //Verifica que el resultado no este vacio
    if(!result.isEmpty()){
        return res.render('companies/signup',{
            pagina:'SignUp',
            type:"Companies",
            errors: result.array(),
            student:{
                name:name,
                email,
                address,
                rfc,
                description
            }
        })
    }
    //Verificar que el usuario no este registrado
    const existCompany = await prisma.Student.findUnique({
        where:{
            email
        }
    })

    if(existStudent){
        return res.render('companies/signup',{
            pagina:'SignUp',
            type:"Companies", 
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
    const student = await prisma.student.findUnique({
        where: {
          token
        }
      })
    if(!student){
        return res.render('partials/confirm-account',{
            pagina:"Confirm Account",
            type:"Students",
            mensaje: "Error confirming account",
            error:true
        })
    }
    await prisma.student.update({
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

const postSignIn = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('partials/login', { errors: [{ msg: 'Please enter your email and password' }] });
    }
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('partials/login', {
        errors: [{ msg: 'Mandatory fields' }],
        });
    }
  
    passport.authenticate('local', (err, student, info) => {
      if (err) {
        return next(err);
      }
      if (!student) {
        return res.render('partials/login', { 
            errors: [{ 
                msg: info.msg 
            }],
            student:{
                email
            }
        });
      }
  
      req.logIn(student, (err) => {
        if (err) {
          return next(err);
        }
  
        return res.render('students/dashboard' ,{pagina:"dashboard"});
      });
    })(req, res, next);
  };

const resetPassword=async(req,res)=>{

    await check('email').isEmail().withMessage("That's not an email").run(req)

    let result = validationResult(req)
 
    //Verifica que el resultado no este vacio
    if(!result.isEmpty()){
        return res.render('partials/olvide-password',{
            pagina:'Forgot Password?',
            type:"Students",
            errors: result.array(),
        })
    }

    //Buscar el usuario
    const{email} = req.body
    const existStudent = await prisma.Student.findUnique({
        where:{
            email
        }
    })

    if(!existStudent){
        return res.render('partials/olvide-password',{
            pagina:'Forgot Password?',
            type:"Students",
            errors: [{msg:"The email does't belong to any user"}],
        })
    }

    //Generar un token 
    existStudent.token = generarId()
    const{token,id,fullName} = existStudent

    
    await prisma.student.update({
        where:{id},
        data: {
            token 
        }
    })
    
    //Enviar email
    emailForgotPassword({
        email,
        fullName,
        token  
    })
    //Renderizar mensaje
    res.render('partials/mensaje',{
        type:'Students',
        pagina:'Reset Password',
        message: "We've sent an email with the instructions"
    })
}   

const checkToken=async(req,res)=>{
    const {token} = req.params
    const student = await prisma.student.findUnique({
        where: {
          token
        }
      })
    if(!student){
        return res.render('partials/confirm-account',{
            pagina:"Reset Password",
            type:"Students",
            mensaje: "Error resetting password",
            error:true
        })
    }

    //Mostrar Formulario para modificar el password
    res.render('partials/resetPassword',{
        type:"Students",
        pagina: 'Reset Password'
    })
}
const newPassword=async(req,res)=>{
    //Validar el password
    await check('password').isLength({min:6}).withMessage('The password must have a minimum of 6 characters').run(req)
    
    let result = validationResult(req)
 
    //Verifica que el resultado no este vacio
    if(!result.isEmpty()){
        return res.render('partials/resetPassword',{
            pagina:'Reset your Password',
            type:"Students",
            errors: result.array(),
        })
    }

    //Identificar quien hace el cambio
    const {token} = req.params
    const {password} = req.body

    const student = await prisma.student.findUnique({
        where: {
          token
        }
    })

    //Hashear el nuevo password
    const hashedPassword = await bcrypt.hash(password, 10);
    const {id} = student
    await prisma.student.update({
        where:{id},
        data: {
            token: null,
            password:hashedPassword
        }
    })

    res.render('partials/confirm-account',{
        pagina:'Pasword Reset',
        mensaje:'Password saved successfully'
    })
}
export{
    logInStudent,
    signUpStudent,
    register,
    confirm,
    formularioOlvidePassword,
    postSignIn,
    getProfilePage,
    resetPassword,
    checkToken,
    newPassword,
    getmyUpsPage
} 

