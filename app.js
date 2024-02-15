const express = require('express');
const app = express();

require("dotenv").config();

const path = require('path');
const connectDB = require("./config/database");
const multer = require('multer');

const upload = multer();

// cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser())
 
app.use('/',express.static('./public')); 
app.use('/blog',express.static('./public'));
app.use('/tinymce',express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
    res.setHeader('Set-Cookie', 'HttpOnly;secure;SameSite=None');
    next();
});

const MainPageRoute = require("./routes/MainRenseign")
const adminLoginRoute = require('./routes/A_loginForm.js');

// ???
app.use("/",MainPageRoute);
app.use("/renseignement",MainPageRoute);
app.use(adminLoginRoute);

const auth = require("./middleware/auth");
const A_login = require('./routes/A_login');
const adminPanel=require("./routes/adminPanel");
const DayStatus = require('./model/dayStatusSchema');


// does the login =(comapre pw and userName and creat jwt)
app.use(upload.none(),A_login);
app.use('/adminPanelMain',auth,adminPanel) // /adminPanelMain branch is locked with auth 
const usersCrud = require("./routes/usersCrud");
app.use("/adminPanelMain",auth,usersCrud);

const postsRoute=require("./routes/posts.js");
app.use('/',postsRoute); 

const UserLoginFormRoute = require("./routes/U_loginForm")
app.use("/",UserLoginFormRoute)

//The route that handle token creation and verification
const U_loginLogicRoute = require("./routes/U_login");
app.use("/",U_loginLogicRoute);

//Email Verification 
const emailVerificator = require("./routes/emailVerif");
app.use("/",emailVerificator);

// I want blog/blogEditor/{something} to be locked 
const authTrois = require("./middleware/auth3");
const blogEditorRoute = require("./routes/blogEditing")
app.use("/blog/blogEditor",authTrois,blogEditorRoute);
 
const authdeux = require("./middleware/auth2");
app.get("/blog/addQst",authdeux,(req,res)=>{
    res.status(200).render("QuestionsEditor.ejs")
})

//Getting regiration page and doing some logic 
const UsersRegistrationRoute=require("./routes/U_register");
app.use("/",UsersRegistrationRoute);

app.use("/",(req,res)=>{
    try {
      res.status(404).render("./pageNotFound.ejs");  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"problem on server side"})
    }
})

const port = 3000;
const start = async() => {

    try {   
        await connectDB(process.env.MONGO_URI);
        console.log("connected to DataBase");
        app.listen(port, () =>
        console.log(`Servser is listening on port ${port}...`)
         );
    } catch (error) {
        console.log(error);
    }

}
start();


