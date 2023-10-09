import nodemailer from "nodemailer"
import config from '../config/key.js';

const Sendemail = (name,email) => {
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

        let subject = 'Congratulations! Your Report Card Generated...';
        let message = `
  <p>Dear ${name},</p>
  <p>We are excited to inform you that your exam score card has been generated successfully.</p>
  <p>You can access your score card by clicking on the following link:</p>
  <a href="http://localhost:3000/user/login" target="_blank">View Your Score Card</a>
  <p>Please make sure to keep a copy of your score card for your records.</p>
  <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
  <p>Best regards,<br/>Your School/Institution Name</p>
`;

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
export default Sendemail