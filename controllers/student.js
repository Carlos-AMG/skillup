<<<<<<< HEAD
import { PrismaClient } from "@prisma/client"
import { check, validationResult } from "express-validator"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

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

const register =async (req,res)=>{
    //Validacion
    await check('fullName').notEmpty().withMessage('Name is required').run(req)
    await check('email').isEmail().withMessage("That's not an email").run(req)
    await check('education').notEmpty().withMessage('Education is required').run(req)
    await check('password').isLength({min:6}).withMessage('The password must have a minimum of 6 characters').run(req)



    let result = validationResult(req)


    const {fullName,email,education,profileImage,password,cv,link} = req.body
    //Verifica que el resultado no este vacio
    if(!result.isEmpty()){
        return res.render('students/signup',{
            pagina:'SignUp',
            type:"Students",
            errores: result.array(),
            student:{
                name:fullName,
                email,
                education
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
            errores: [{msg:'User already registered'}],
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
    await prisma.Student.create(
        {data:{
            fullName,
            email,
            password,
            education,
            profileImage,
            cv,
            link,
            token:'123'
        }}
    ) 

}
 
const formularioOlvidePassword = (req,res)=>{
    res.render('partials/olvide-password',{
        type:"Students",
        pagina: 'Forgotten Password?'
    })
}
export{
    logInStudent,
    signUpStudent,
    register,
    formularioOlvidePassword
} 
=======

export{

}
>>>>>>> 8f995e978f7b05ed45248c50ef4e6779354630b1
