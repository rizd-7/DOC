const express = require('express');
const router = express.Router();


const getBlogEditor = (req,res)=>{
    try {
        res.status(200).render("./blogEditor.ejs")
    } catch (error) {
        console.error("Error rendering blogEditor page:", error);
        res.status(500).send("Internal Server Error");
    }
}


router.route("/").get(getBlogEditor);
module.exports = router;