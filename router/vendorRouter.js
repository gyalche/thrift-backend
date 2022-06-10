import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
import vendor from "../module/vendor.js";
import express from "express";
import {verifyVendor}  from "../auth/auth.js";
import upload from '../file/file.js';
const router=new express.Router();

router.post('/vendor/register', function(req, res){
    const userName = req.body.userName;
    const phoneNumber = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const role=req.body.role;

    vendor.findOne({userName:userName}).then((vendorData) => {
        if(vendorData!==null){
            res.json({msg:"already exists"})
        }

        bcryptjs.hash(password, 10, function(err, hashPasswords) {
            const vendorData=new vendor({
                userName:userName,
                phoneNumber:phoneNumber,
                email:email,
                password:hashPasswords,
                role:role
            })
            vendorData.save()
            .then(function(){
                res.json({msg:"successfully registerd", sucess:true})
            })
            .catch(function(err){
                res.json({msg:"failed to register"})
            })
        })
    })


})

//now vendor login

router.post('/vendor/login', function(req, res){
    const userName=req.body.userName;

    vendor.findOne({userName:userName}).then(function(vendorData){
        if(vendorData==null){
             res.json({msg:"username not found"});
             return;
        }
        //if username is found then

        const password = req.body.password

        bcryptjs.compare(password, vendorData.password, function(err,result){
            if(result==false){
                return res.status(404).send({msg:"password doesnt match"});
            }
            //if password and username matches then

            const token=jwt.sign({vendorId:vendorData._id}, "mysecretkey");
            res.json({token:token, vendorData, msg:'token granted for vendor'})
        })
    })
})




// router.put('/vendor/profile', upload.single('image'), verifyVendor, function (req, res) {
//     if(req.file==undefined){
//         res.json({msg:"invalid format"})
//     }
//     else{
//         vendor.findOneAndUpdate({_id:req.vendorInfo._id},{
//             image:req.file.filename,
//         }).then((data) => {
//             res.json({msg:"sucessfully uploaded image", data})
//         })
//     }
// })

// delete account
router.delete("/vendor/delete", verifyVendor, function(req, res){
    vendor.deleteOne({_id:req.vendorInfo._id}).then((data) => {
        res.json({msg:"sucessfully deleted"})
    })
})

//update doner dashboard

router.put("/vendor/update",upload.single('profile'), verifyVendor, function(req, res){
    const userName=req.body.userName;
    const phoneNumber=req.body.phoneNumber;
    const email=req.body.email;
    const image=req.body.image;
    const password=req.body.password;
    const role=req.body.role;
    bcryptjs.hash(password, 10, function(err, hashPasswords){
        vendor.findOneAndUpdate({_id:req.vendorInfo._id},{
            userName:userName,
            phoneNumber:phoneNumber,
            email:email,
            password:hashPasswords,
            image:image,
            role: role

        }).then((data) => {
            res.json({success:"updated sucessfully",
            data
        })
        })
    })

})

// show vendor dashboard
router.get('/vendor/dashboard', verifyVendor, function(req, res){
    res.json({
        id:req.vendorInfo.id,
        userName:req.vendorInfo.userName,
        email:req.vendorInfo.email,
        phoneNumber:req.vendorInfo.phoneNumber,
        image:req.vendorInfo.image,

        

    })
})


export default router;