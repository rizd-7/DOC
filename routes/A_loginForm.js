const express = require('express');
const router = express.Router();

const GetAdminLogIn=(req,res)=>{
    
    try {
        res.status(200).render("A_loginForm.ejs",{
            errorMessage:""
        }) 
    } catch (error) {
           console.error("Error rendering admin login page:", error);
           res.status(500).send("Internal Server Error");
     }
}

router.route('/AdminLogInForm').get(GetAdminLogIn) ;

module.exports = router;