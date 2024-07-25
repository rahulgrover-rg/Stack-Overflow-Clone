import nodemailer from 'nodemailer' ;
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com' ,
    port : 587 ,
    secure : false ,
    auth : {
      user : "rahulgrover9373@gmail.com" ,
      pass : "yzhkfhxpzpmuvfdo" ,
    }
  })

const sendMail = async(to,subject,html) => {

    try {
        const mailOptions = {
            from : "rahulgrover9373@gmail.com" ,
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

export default sendMail ;