const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null, required: true },
  last_name: { type: String, default: null,required: true },
  user_name:{type:String , default: null ,required: true },
  email: { type: String, unique: true ,required: true},
  isVerified:{type:Boolean,default:false},
  password: { type: String, required: true },
  role:{ type:String, default:"regular",required:true },
  status:{type:String, default:"none"},
  profilPic:{ type:String, default:"randomUser.jpg" },
  token: { type: String }, 
});

const RegulatUser = mongoose.model("user", userSchema);
const AdminUser = mongoose.model("admin", userSchema);

module.exports = {RegulatUser,AdminUser};