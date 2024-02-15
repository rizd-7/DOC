const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/async')
const {RegulatUser}= require('../model/Users');

const deleteUser = asyncWrapper( async (req,res)=> {
    
    try {
        const userId = req.params.userId;
        const deletedUSer = await RegulatUser.findByIdAndDelete({_id:userId});
        res.status(204).json({message:"User deleted succesfully"})
    } catch (error) {
        res.status(500).json({message:"Couldn't delete user"})
    }


})

const updateUser =  asyncWrapper( async (req,res)=>{

    try {
        const userId = req.params.userId;
        console.log(req.params);
        

        if(req.query.op=="upg"){
            const updatedUSer = await RegulatUser.findByIdAndUpdate(userId, { role: "bloger" });
        }else{
            if(req.query.op=="downg"){
                const updatedUSer = await RegulatUser.findByIdAndUpdate(userId, { role: "regular" });
            }else{
                console.log("Role attribution problem");
                return res.status(500).json({message:"Role attribution problem"})
                
            }
        }

        if(!updatedUSer){
            console.log("document does not exist");
            return res.status(500).json({message:"document does not exist"})
        }

        
        res.status(200).json({message:"success"})

    } catch (error) {
        return res.status(500).json({message:"Running into issues , could't update user"})
    }

})

router.route('/del/:userId').delete(deleteUser);
router.route("/update/:userId").patch(updateUser);
module.exports = router