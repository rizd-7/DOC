const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
     req.body.token || req.query.token || req.cookies["x-access-token"]; 

 
   if (!token) {
     /* return res.status(403).send("A token is required for authentication"); */
     
     return res.status(403).redirect('/blog/userLoginForm');
   }
   
   try {
      
     const decoded = jwt.verify(token, config.TOKEN_KEYY);
     req.admin = decoded;
    
   } catch (err) {

        try {
          const decoded = jwt.verify(token, config.TOKEN_KEY);
          req.admin = decoded;
        } catch (error) {
          return res.status(401).render("U_loginForm.ejs",{
            message:"",
            message2:"veuillez vous connecter a votre compte"
          });
        }  
   }
   return next();
 };
 
 module.exports = verifyToken;
