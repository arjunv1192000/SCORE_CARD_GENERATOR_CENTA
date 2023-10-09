import adminHelper from "../model/adminHelper.js";
import authservice from "../service/authservice.js";
import Sendemail from "../service/mailservice.js";

const adminController = {
    AdminLogin: async (req, res) => {
        try {
            const { email, password } = req?.body;
            const isUsername = await adminHelper.Login(email);
            console.log(isUsername, "dataaaaaaa");
    
            if (isUsername && isUsername[0] && isUsername[0].username != null && isUsername[0].password) {
                console.log("kriii");
    
                const isPassword = await authservice.comparePassword(password, isUsername[0].password);
    
                console.log(isPassword, "ffff");
    
                if (isPassword) {
                    const isAdmin = {
                        adminUsername: isUsername[0].username,
                    };
                    const AccessToken = authservice.generateAccessToken(isAdmin);
    
                    console.log(isAdmin, "ddddd");
    
                    return res.json({ status: true, isAdmin, AccessToken });
                } else {
                    return res.json({ status: false });
                }
            } else if (isUsername === null) {
                return res.json({ message: 'Invalid email or password', status: false });
            } else {
                return res.json({ message: 'Invalid email or password', status: false });
            }
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'An error occurred' });
        }
    },


    Adduserdata: async (req, res) => {
        try {
            const { files } = req?.body;
           
            const result = await adminHelper.Adduserdata(files);

            res.status(200).json({ message: 'Data inserted successfully', result,status: false  });

        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'An error occurred' });

        }

    },

    Getuserdata:async(req,res)=>{
        try{

            const userdata=await adminHelper.getAlluserdata( )

            
       
            return res.json({ status: true, userdata });

        }catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'An error occurred' });
            

        }

    },
    GenerateCard: async (req, res) => {
        try {
            
            const result = await adminHelper.generaeteScoreCard();

            if (result && result.length > 0) {
                
                for (const student of result) {
                  const { student_fullname, student_email } = student;
                 
                  Sendemail(student_fullname, student_email);
                }
          
                res.status(200).json({ message: 'Score cards generated and emails sent successfully', status: true });
              } else {
                
                res.status(200).json({ message: 'No score cards generated or no students to email', status: false });
              }
            

           


            
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'An error occurred' });

        }

    },
    ViewCard:async(req,res)=>{
        try{
            const { email } = req.query;
            console.log(email,"single");

            const userdata=await adminHelper.getuserdata(email )

            console.log(userdata,"kkkkk");
       
            return res.json({ status: true, userdata });

        }catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'An error occurred' });
            // return { message: 'Error getting jobs', status: false };

        }

    },
    
};

export default adminController;
