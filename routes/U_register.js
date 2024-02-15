const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/async')
const bcrypt = require('bcryptjs');
const {RegulatUser} = require("../model/Users");
const isValidEmail = require("../utils/passwordMatch");


const getRegistrationForm = (req,res)=>{
    try {
        
        res.status(200).render("U_registerForm.ejs",{
            message:"",
        }) 
    } catch (error) {
        console.error("Error rendering users registration page:", error);
        res.status(500).send("Internal Server Error");
     }
}

async function hashPassword(plainPassword) {
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error; // You might want to handle this error appropriately in your code
    }
  } 

const registerationLogic = asyncWrapper(async (req,res)=>{

    //GET info 
    //Bcrypt password
    // Store it into db
     
    console.log(isValidEmail(req.body.emailAdress));

    if(!isValidEmail(req.body.emailAdress)){
        return res.status(500).render("U_registerForm.ejs",{
            message:"veuillez entrer une adresse mail valide ",
        })
    }

    if(req.body.password!=req.body.password_verif){
        return res.status(500).render("U_registerForm.ejs",{
            message:"veuillez entrer un mot de passe de vérification identique a celui que vous avez entrez en premier lieux ",
        })
    }

    try {

        const hashedPassword = await hashPassword(req.body.password);
        const userData={
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            user_name: req.body.userName,
            email: req.body.emailAdress,
            password:  hashedPassword,
            role:"regular"
          }
 
        const UserExist = await RegulatUser.findOne({ email: req.body.emailAdress });
        
        if(UserExist){
            return res.status(409).render("U_registerForm.ejs",{
                message:"user Already exists please logIn or recover your account",
            })
        }

        try {
          const newUser = await RegulatUser.create(userData);  
          res.status(200).redirect("/blog/userLoginForm")
        } catch (error) {
            throw new Error("for some reason we haven't been able to create your account , we apologize")
        }


      } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"})
      }

})


router.route('/blog/u_register').get(getRegistrationForm).post(registerationLogic);

module.exports = router;