const express = require('express');
const router = express.Router();

const servieInfo_array=[
    {
        title:"consultations et suivis",
        offer:"On vous popose des consultations et un diagonstique au niveau de notre cabinet",
    },
    {
        title:"Radio musculaire",
        offer:"On vous popose des consultations et un diagonstique au niveau de notre cabinet medical ,Profestionalisme compation et altroisme c’est ce qu’on tien vous ofrir ,",
    },
    {
        title:"consultations et suivis",
        offer:"On vous popose des consultations et un diagonstique au niveau de notre cabinet",
    },
    {
        title:"Radio musculaire",
        offer:"On vous popose des consultations et un diagonstique au niveau de notre cabinet medical ,Profestionalisme compation et altroisme c’est ce qu’on tien vous ofrir",
    },
]

const faqPage_getter = (req,res)=>{
    return res.status(200).render("FAQ")
}

const service_getter = (req,res)=>{

    const serviceId = req.query.ServiceID;
    return res.status(200).render("service",servieInfo_array[serviceId-1])
}




router.route('/faq').get(faqPage_getter);
router.route('/service').get(service_getter);

module.exports = router;