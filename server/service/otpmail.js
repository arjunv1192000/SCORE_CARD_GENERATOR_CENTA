import nodemailer from "nodemailer"
import config from '../config/key.js';


const SendOTP=(otp,email,name)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: config.EMAIL,
                pass: config.PASSWORD,
            },
        });

        let subject = 'OTP Verification';
        let message = `Dear ${name},

        Thank you for using our service! To proceed with your verification, please use the following One-Time Password (OTP):
        
        OTP: ${otp}
        
        Please enter the provided OTP within 60 seconds to complete your verification process. Please note that this OTP is valid for a limited time and should be kept confidential.
        
        If you did not request this OTP, please ignore this email. Do not share the OTP with anyone, as it is a security measure to protect your account.
        
        If you have any questions or need assistance, please feel free to contact our support team
        
        Thank you for choosing our service!`;

        const mailOptions = {
            from: config.EMAIL,
            to: email,
            subject: subject,
            html: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });



    } catch (error) {

    }


}
export default SendOTP