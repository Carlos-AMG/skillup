import nodemailer from 'nodemailer'

const emailSignUp = async(data)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      })
      const{fullName,email,token} = data

      //Enviar el email
      await transport.sendMail({
        from:'SkillUp.com',
        to:email,
        subject:'Confirm your account on SkillUp',
        text: 'Confirm your account on SkillUp',
        html: `
            <p>Hi ${fullName}!, check your SkillUp account</p>
            <p>Your account is already ready, you just have to confirm it in the following link: 
                <a href="http://localhost:3000/students/confirm/${token}">Confirm Account</a>
            </p>
            <p>If you did not create this account, ignore the message</p>
        `
      })
}

export{
    emailSignUp
}