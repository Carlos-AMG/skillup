const logIn= (req,res)=>{
    const type = req.params.userType; 
    res.render('partials/login',{
        type,
        pagina:"LogIn"
    })
}

const signUp = (req,res)=>{

    const type = req.params.userType;
    let singUpPage ;
    if(type == "students"){
        singUpPage = "signup"
    }else{
        singUpPage = "signupCompany"
    }
    res.render(`partials/${singUpPage}`,{
        type,
        pagina: 'SignUp'
    })
}
const forgotPassword = (req,res)=>{
    const type = req.params.userType;
    res.render('partials/olvide-password',{
        type,
        pagina: 'Forgotten Password?'
    })
}

export{
    logIn,
    signUp,
    forgotPassword
}


