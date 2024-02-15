const express = require('express');
const router = express.Router();
const DayStatusSchema = require('../model/dayStatusSchema');
const TextSchema = require("../model/unstructuredText");
const asyncWrapper = require('../utils/async')
const {RegulatUser}= require('../model/Users');

const JsonConcatenation = require('../utils/JsonConcat');

const getAdminPanelMain = asyncWrapper( async (req,res)=>{

    // anyways their is only one element 
    try {
      const actualProg = await DayStatusSchema.findById({_id:"64ec6f337f56ead19cc55177"}) 
      const actualText = await TextSchema.findById({_id:"64f0c8ad895783121b7c0518"})
      const Users = await RegulatUser.find({});
      

      const concatenator = new JsonConcatenation(actualProg,actualText);   
      const finalJson = concatenator.concat(actualProg,actualText);
      var jsonObject = JSON.parse(finalJson);
      
       
       return res.status(200).render("./admin_panel.ejs",{
        jsonObj:jsonObject,
        allUsers:Users,
       });

    } catch (error) {
      console.log(error);
      return res.status(404).json({message:"probleme"})
    }
})

// Does get the posted data and put it in place into db
const SetProgram = asyncWrapper(async (req,res)=>{ 
        console.log(req.body);
        const result = DayStatusSchema.findOneAndUpdate({_id:"64ec6f337f56ead19cc55177"},req.body)
        .then((data)=>{
          return res.status(200).json({message:"sucess update"});
        })
        .catch(()=>{
          return res.status(501).json({message:"fail update"})
        })       

})

const SetNoteDuDoc =  asyncWrapper( async (req,res)=>{  

  const injectedObject = {
    _id:"64f0c8ad895783121b7c0518",
    texts: [req.body.text] 
  }

  const actualText =TextSchema.findOneAndUpdate({_id:"64f0c8ad895783121b7c0518"},injectedObject)
  .then((resolve)=>{
    return res.status(200).json({message:"note updated succefully"});
  }).catch((reject)=>{
    return res.status(500).json({message:"note update  failed"});
  })
})
 
router.route('/').get(getAdminPanelMain);
router.route("/SetProgram").patch(SetProgram);
router.route("/setNote").patch(SetNoteDuDoc)

module.exports = router;

 