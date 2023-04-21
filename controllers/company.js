const logInCompany= (req,res)=>{
    res.render('partials/login',{
        type:"Companies",
        pagina:"LogIn"
    })
}

const signUpCompany = (req,res)=>{
    res.render('partials/signupCompany',{
        type:"Companies",
        pagina: 'SignUp'
    })
}
const formularioOlvidePassword = (req,res)=>{
    res.render('partials/olvide-password',{
        type:"Companies",
        pagina: 'Forgotten Password?'
    })
}
export{
    logInCompany,
    signUpCompany,
    formularioOlvidePassword
}