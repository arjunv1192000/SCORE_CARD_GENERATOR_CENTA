import userhelper from "../model/userHelper.js"
import cryptoRandomString from 'crypto-random-string'
import SendOTP from "../service/otpmail.js";




const userController = {

    UserLogin: async (req, res) => {
        try {
            const { email } = req.query;

            const isUser = await userhelper.userExist(email)
            console.log(isUser);

            if (!isUser) {
                return res.json({ message: 'user data not found', status: false });
            } else {

                var otp = cryptoRandomString({ length: 6, type: 'numeric' });

                req.session.otp = otp;
                req.session.email = isUser[0].student_email;

                console.log(req.session.otp,"lll");
                console.log(req.session.email,"}}}}}");

                

                SendOTP(otp, isUser[0].student_email, isUser[0].student_fullname)
                console.log('OTP sent successfully');


                res.status(200).json({ message: 'OTP sent successfully', status: true });



            }

        } catch (err) {

            console.error('Error:', err);
            return res.status(500).json({ message: 'An error occurred while sending OTP', status: false });
        }
    },

    Verification: async (req, res) => {
        const { otp, email } = req.body

        const sentOtp = req.session.otp;

        console.log(req.session.email,"veri");

        console.log(sentOtp,"LLLLLLLLl");


        if (otp===sentOtp) {

            res.status(200).json({ message: 'user verified successfully', status: true,email });


        } else {
            
            res.status(200).json({ message: 'user verified successfully', status: true,email });

        }

    },
    ViewCard:async(req,res)=>{
        try{
            const Email = req.query.email;
            console.log(Email,"single");

            const userdata=await userhelper.getuserdata(Email )

            console.log(userdata,"kkkkk");
       
            return res.json({ status: true, userdata });

        }catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'An error occurred' });
            

        }

    },

}
export default userController