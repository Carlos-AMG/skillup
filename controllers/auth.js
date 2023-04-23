import bcrypt from "bcrypt";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
export const signInStudent  = passport.authenticate("student-local", {
  successRedirect: "/students/dashboard",
  failureRedirect: "/students/login",
});

export const signInCompany = passport.authenticate("company-local", {
  successRedirect: "/companies/dashboard",
  failureRedirect: "/companies/login",
});

// SignUp handlers
export const registerStudent = async (req, res) => {
    console.log("student")
    console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const student = await prisma.student.create({
      data: { ...req.body, password: hashedPassword },
    });
    req.login(student, (err) => {
      if (err) throw err;
      res.redirect("/students/dashboard");
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cuenta" });
  }
};

export const registerCompany = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const company = await prisma.company.create({
      data: { ...req.body, password: hashedPassword },
    });
    req.login(company, (err) => {
      if (err) throw err;
      res.redirect("/companies/dashboard");
    });
  } catch (error) {
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
