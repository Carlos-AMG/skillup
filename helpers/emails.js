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
        subject:'Confirm your account in SkillUp',
        text: 'Confirm your account in SkillUp',
        html: `
            <p>Hi ${fullName}!, check your SkillUp account</p>
            <p>Your account is already ready, you just have to confirm it in the following link: 
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/students/confirm/${token}">Confirm Account</a>
            </p>
            <p>If you did not create this account, ignore the message</p>
        `
      })
}

const emailForgotPassword = async(data)=>{
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
      subject:'Reset your password in SkillUp',
      text: 'Confirm your account in SkillUp',
      html: `
          <p>Hi ${fullName}!, you have requested to reset your password in SkillUp</p>
          <p>Follow the link below to generate a new password: 
              <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/students/forgot-password/${token}">Reset Password</a>
          </p>
          <p>If you did not request this, ignore the message</p>
      `
    })
}
export{
    emailSignUp,
    emailForgotPassword
}