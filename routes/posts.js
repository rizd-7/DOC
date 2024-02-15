const express = require('express');
const router = express.Router();

const blogSchema = require("../model/blogSchema");
const {RegulatUser,AdminUser}= require('../model/Users');
const asyncWrapper = require('../utils/async')
const jwt = require('jsonwebtoken');
const config = process.env;

const GetPostPage= asyncWrapper(async (req,res)=>{

    //LOGIC 
    // extract the url param : all or blogId 
    // if all then const blogPost = await blogSchema.find({}).sort({date:-1}).limit(1);
    // if id then show that specific id only 
    // if not found write not found 

  
    
    try {
         
        //Get token
        const token = req.body.token || req.query.token || req.cookies["x-access-token"]; 

         //just to load the logged user info 
        if (!token) {
            // User is not logedIn render 
            return res.status(200).render("blog.ejs",{
                profilPicture:"./assets/randomUser.jpg",
            })
          }

          var decoded;

          try {
            
            decoded = jwt.verify(token, config.TOKEN_KEYY);
            console.log("IT S A REGULAR USER");
          } catch (err) {
            console.log("IT S AN ADMIN ");
            decoded = jwt.verify(token, config.TOKEN_KEY);
          }

          console.log(decoded);

          req.user = decoded; // not sure about the utility of it 

          const userID = decoded.user_id;
           
         var myUser;

          try {
            myUser = await RegulatUser.findById({_id:userID})
            if(!myUser){
                throw new Error("Not what we are looking for")
            }
            console.log("normal user want to get blog");
          } catch (error) {
            myUser = await AdminUser.findById({_id:userID});
            console.log("admin user want to get blog");
          }

           

          return res.status(200).render("blog.ejs",{
            profilPicture:`./assets/${myUser.profilPic}`,
         }) 
          
    } catch (error) {
        console.error("Error rendering posts page:", error);
        res.status(500).send("Internal Server Error");
     }
})



const submitBlog= asyncWrapper( async (req,res)=>{
    //add a blog Blog post
    try {
        var NewBlogPost = {
            content:req.body.blog,
            referencer:req.body.ref.split(',')
        }
        const blogPost = await blogSchema.create(NewBlogPost)
        res.status(201).redirect("/blog/blogEditor")

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
});

// FETCH ONLY ONE BLOG POST (AN OTHER FETCH FOR THE ALL BLOGPOSTS)
const fetchBlogPost = asyncWrapper(async (req,res)=>{


    try { 
         
        var indicator = req.query.mess;
        var blogPost;
        var authID
        var flag=0;
        
        if(indicator=="all"){
            blogPost = await blogSchema.find({}).sort({date:-1}).limit(1); //Got retreived into an array
            console.log(blogPost);
            authID = blogPost[0].author;
            flag=1;
        }else{
            blogPost = await blogSchema.findById({_id:indicator});        
           //  console.log(blogPost); 
            authID = blogPost.author;
            flag=-1;
        }

        if(!blogPost){
            throw new Error("Problem fetching the right blog post");
        }

       

        var auth;       
        try {
             auth = await RegulatUser.findById({_id:authID});
             
             if(!auth){
                throw new Error("NOT REGULAR USER")
             }

             console.log(auth);
              
        } catch (error) {    
           auth = await AdminUser.findById({_id:authID});
        }
        
        //PUTING IN A SET BLOG WITH ITS AUTHOR 

        if(flag==1){
            var blogAuthSet = {
                blog : blogPost[0],
                author: auth,
            }    
        }

        if(flag==-1){
            var blogAuthSet = {
                blog : blogPost,
                author: auth,
            }   
        }
       
       
        res.status(200).json({blogAuthSet:blogAuthSet})

    } catch (error) {
        res.status(500).json({mssage:"error couldn't fetch blog post"})
    }

})

router.route("/blog").get(GetPostPage);
 
router.route("/blog/publishBlog").post(submitBlog);
router.route("/blog/fetchBlog").get(fetchBlogPost)

module.exports = router;