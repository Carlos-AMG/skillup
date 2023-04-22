const logInStudent = (req,res)=>{
    res.render('partials/login',{
        type:"Students",
        pagina:"LogIn"
    })
}

const signUpStudent = (req,res)=>{
    res.render('partials/signup',{
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
export{
    logInStudent,
    signUpStudent,
    formularioOlvidePassword
}