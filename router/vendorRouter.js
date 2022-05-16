import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
import vendor from "../module/vendor.js";
import express from "express";
const router=new express.Router();

router.post('/vendor/register', function(req, res){
    const userName = req.body.user;
    const phoneNumber = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

    vendor.findOne({userName:userName}).then((vendorData) => {
        if(vendorData!==null){
            res.json({msg:"already exists"})
        }

        bcryptjs.hash(password, 10, function(err, hashPasswords) {
            const vendorData=new vendor({
                userName:userName,
                phoneNumber:phoneNumber,
                email:email,
                password:hashPasswords
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
export default router;