//jsonweb token import
import jwt from  'jsonwebtoken';
// import customer from '../module/customer';
import customer from '../module/customer.js';
import express from 'express';
import vendor from '../module/vendor.js';
import mongoose from 'mongoose'; 
// import res from 'express/lib/response';

export const verifyCustomer=function(req, res, next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, "mysecretkey");

        customer.findOne({_id:data.customerId}).then(function(result){
            console.log(result)
            req.customerInfo=result;
            next();
        })
        .catch((err)=>{
            res.json({error:"not working"})
        })
    }
    catch(err){
        res.send({msg:"inavlid token"})
    }
}

export const verifyVendor=function(req, res, next){
    try{
    
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, "mysecretkey");

        vendor.findOne({_id:data.vendorId}).then(function(result){
            req.vendorInfo=result;
            next();
        })
        .catch(function(e){
            res.json({err:e})
        })
    
}
catch{
    res.json({err:"error"})
}
}


