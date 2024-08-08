import nodemailer from 'nodemailer' ;
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com' ,
    port : 587 ,
    secure : false ,
    auth : {
      user : process.env.EMAIL ,
      pass : process.env.APP_PASSWORD ,
    }
  })
// P3CB65F3EFAP618HNNF53XYQ
export const sendMail = async(to,subject,html) => {

    try {
        const mailOptions = {
            from : process.env.EMAIL ,
            to : to ,
            subject : subject ,
            html : html
        } ;

        const info = await transporter.sendMail(mailOptions) ;
        console.log('Email sent to ',to ) ;
        return {
            message : 'email successfully sent to' + to ,
            info : info
        }
    } catch (error) {
        console.log('error' , error.message) ;
        return {
            message : 'email not sent',
            error : error.message
        }
    }
}
