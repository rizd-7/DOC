const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/async')
const DayStatusSchema = require('../model/dayStatusSchema');
const TextSchema = require("../model/unstructuredText");
const JsonConcatenation = require('../utils/JsonConcat');

const getMainPage = asyncWrapper( async (req,res)=>{

    try {
       // getting info from db -> render
    const weeklyProgram = await DayStatusSchema.findById({_id:"64ec6f337f56ead19cc55177"});
    const noteDuDoc = await TextSchema.findById({_id:"64f0c8ad895783121b7c0518"});
   
    if(!weeklyProgram || !noteDuDoc){
      return res.status(404).send({message : "programme ou note Introvable"})
    }

    const concatenator = new JsonConcatenation(weeklyProgram,noteDuDoc); 
    const finalJson = concatenator.concat(weeklyProgram,noteDuDoc)
    var jsonObject = JSON.parse(finalJson);
     
    res.status(200).render("index.ejs",jsonObject);
    } catch (error) {
      console.error("Error processing data:", error);

    // Send a generic error response to the client
    return res.status(500).send({ message: "Internal Server Error" });
    }
})

const getRenseignPage = (req,res)=>{
  try {
    res.render("renseignement.ejs");
  } catch (error) {
    console.error("Error rendering renseignement page:", error);
    res.status(500).send("Internal Server Error");
  } 
}

router.route("/").get(getMainPage);
router.route("/renseignement").get(getRenseignPage);

module.exports = router;