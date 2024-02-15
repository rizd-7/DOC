const express = require('express');
const router = express.Router();

const GetUsersLogInForm=(req,res)=>{
    
   
    try {
        res.status(200).render("U_loginForm.ejs",{
            message:"",
            message2:""
        })
    } catch (error) {
           console.error("Error rendering user login page:", error);
           res.status(500).send("Internal Server Error");
     }
}

router.route('/blog/userLoginForm').get(GetUsersLogInForm) ;

module.exports = router;