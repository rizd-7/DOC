const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({

  content: { type: String, default: "<p>post vide</p>", required: true },
  date: { type: Date,default: Date.now , required: true},
  author:{type:String, default:"unkown",required:true},
  oneWordTopic:{type:String, default:"neurologie",required:true},
  referencer:[{ type: String ,default:"" , required:true}],
 
});

const blogSchem = mongoose.model("blog", blogSchema);
 
module.exports = blogSchem;