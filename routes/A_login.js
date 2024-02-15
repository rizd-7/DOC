const express = require('express');
const router = express.Router();
const {AdminUser}= require('../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginLogic = async (req,res)=>{

    try {
        const { emailAdress, password } = req.body;
        if (!(emailAdress && password)) {
            res.status(400).send("All input is required");
          }
    
          // Validate if user exist in our database
        const admin = await AdminUser.findOne({ email: emailAdress });

        if (admin && (await bcrypt.compare(password, admin.password))){
             
            //a Token is created for each login 
            const token = jwt.sign(
                { user_id: admin._id, emailAdress },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
             
            admin.token=token;

            res.cookie("x-access-token", token, {
              path:"/",
              sameSite:true,
              httpOnly: true,
              maxAge: 60 * 60 * 2 * 1000,
            });
             
            return res.redirect("/adminPanelMain");
        }
         
        res.status(400).render("A_loginForm.ejs",{
          errorMessage:"Invalid Credentials*"
        });
        
    } catch (error) {
       // Need to do something 
        console.log(error);
    }

}

router.route('/A_login').post(loginLogic);
module.exports = router;