const logInStudent = (req,res)=>{
    res.render('partials/login',{
        pagina:"LogIn"
    })
}

const signUpStudent = (req,res)=>{
    res.render('partials/signup',{
        pagina: 'SignUp'
    })
}
const formularioOlvidePassword = (req,res)=>{
    res.render('partials/olvide-password',{
        pagina: 'Forgotten Password?'
    })
}
export{
    logInStudent,
    signUpStudent,
    formularioOlvidePassword
}