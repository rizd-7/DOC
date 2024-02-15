const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const asyncWrapper = require('../utils/async')
const {RegulatUser}= require('../model/Users');

const verifyEmail = (req,res)=>{
    //  console.log(req.query);
    
      // Add Nodemailer functionality here

      try {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'cabinetdryala@gmail.com',
              pass: 'idqx mehh bgll mroe'
          }
      });
  
      let mailOptions = {
          from: 'cabinetdryala@gmail.com',
        /*   to: req.query.mess, */
          to: req.query.mess,
          subject: 'Email Verification',
          html:`<h1>Veuillez vérifier votre adresse email : <a href='http://localhost:3000/doneVerified?mess=${req.query.mess}'> appuyez ici :) </a></h1>`
        };
  
        transporter.sendMail(mailOptions, function(error, info){
  
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent:'+info.response);
          }
  
        });

        res.status(200).send("<h1>PLease check your email </h1>")
      } catch (error) {
        console.log("Email verificatin went wrong // ERROR MESSAGE :" + error)
        res.status(500).json({error:"Email verification went wrong"})
      }

}


const DbVerifChanger = asyncWrapper (async (req,res)=>{

  // Serach for user throught his emailAdress

 

   try {
    const  ToverifiedUser = await RegulatUser.findOne({email:req.query.mess})

    if(!ToverifiedUser){
      throw new Error("Couldn't find any user to verify")
    }
    
    ToverifiedUser.isVerified=true;

    await ToverifiedUser.save();

    console.log("success!");
    res.status(200).redirect("/blog/userLoginForm")
    
  } catch (error) {
    res.status(500).json({mesage:"verification process has failed /// Error message : "+error});
    } 

});

router.route("/emailVerification").get(verifyEmail)
router.route("/doneVerified").get(DbVerifChanger)
module.exports = router;