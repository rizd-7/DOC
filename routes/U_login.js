const express = require('express');
const router = express.Router();
const {RegulatUser}= require('../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginLogic = async (req,res)=>{

    try {
        const { emailAdress, password } = req.body;
       /*  console.log(req.body); */
        if (!(emailAdress && password)) {
            res.status(400).send("All input is required");
          }
    
          // Validate if user exist in our database
        const user = await RegulatUser.findOne({ email: emailAdress });

         if (user && (await bcrypt.compare(password, user.password))){  
       
            //a Token is created for each login 
            const token = jwt.sign(
                { user_id: user._id, emailAdress, verif:user.isVerified },
                process.env.TOKEN_KEYY,
                {
                  expiresIn: "2h",
                }
              );
             
              user.token=token;
              

            res.cookie("x-access-token", token, {
              path:"/blog",
              sameSite:true,
              httpOnly: true,
              maxAge: 60 * 60 * 2 * 1000,
            });
             
            return res.redirect("/blog");
        }
         
         
        res.status(400).render("U_loginForm.ejs",{
          message:"Invalid Credentials*",
          message2:""
        });
        
    } catch (error) {
        console.log(error);
    }

}


router.route('/blog/U_login').post(loginLogic);
module.exports = router;