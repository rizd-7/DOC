const jwt = require("jsonwebtoken");
const config = process.env;
const {RegulatUser}= require('../model/Users');
const asyncWrapper = require('../utils/async')

const verifyRole = async (dec)=>{

    const userID = dec.user_id;
        
    const user = await RegulatUser.findById({_id:userID})
    
    if(user.role=="regular"){
        throw new Error("regular Users does not have access to the ressource")
    }
        
}


const isHeVerified = async (dec)=>{
  const userID = dec.user_id;
}

const verifyToken = asyncWrapper(async (req, res, next) => {
     const token =
      req.body.token || req.query.token || req.cookies["x-access-token"]; 

  
    if (!token) {
      /* return res.status(403).send("A token is required for authentication"); */
      return res.status(403).redirect('/blog/userLoginForm');
    }
    
    try {
        // true for ADMIN false for REGULAR user

      try {
        var decoded = jwt.verify(token, config.TOKEN_KEY);
        req.admin = decoded;
        console.log("SOMEONE OF ROLE ADMIN TRY TO GET ADMIN");
      } catch (error) {
        var decoded = jwt.verify(token, config.TOKEN_KEYY);
        req.user = decoded;
        console.log("SOMEONE OF ROLE USER TRY TO GET ACCESS");

        if(decoded.verif==false){
          return res.status(302).redirect(`/emailVerification?mess=${decoded.emailAdress}`);
        }

        await verifyRole(decoded);
    
      }
 
    
    } catch (err) {
      return res.status(500).redirect("/blog?message=NoPermition");
    }
    return next();
  });
  
  module.exports = verifyToken;