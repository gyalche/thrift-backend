import bcryptjs from "bcryptjs";
import express from "express";
import mongoose from "mongoose";
import customer from "../module/customer.js";
import jwt from "jsonwebtoken";
const router=new express.Router();

router.post('/customer/register', function(req, res){
    const userName=req.body.userName;
    const phoneNumber=req.body.phoneNumber;
    const email=req.body.email;
    const password=req.body.password;

    console.log(userName);

        //must to rgister
    customer.findOne({userName:userName})
            .then(function(customerData) {
                if(customerData!=null){
                return res.status(401).send({msg:'already exist'})
                    
                }
                //to has the password
                bcryptjs.hash(password, 10, function(err, hashPasswords){
                const customerData=new customer({
                userName:userName,
                phoneNumber:phoneNumber,
                email:email,
                password:hashPasswords,

            
        })
            customerData.save()
            .then(function(){
                res.json({msg:"sucessfully", success:true})
            })
            .catch(function(e){
                res.json({err:e})
            });
        })
    
    })
   
})

//Testing 

    router.post("/customer/test", function(req, res){
        const userName = req.body.userName;

        customer.findOne({userName:userName}).then(function(customerData){
            if(customerData!=null){
                res.json({customerData});
            }else{
                res.status(401).send({msg:"invalid username"});
            }
        })
    })

    //Customer Login

    router.post('/customer/login', function(req, res){
        const userName=req.body.userName;
        customer.findOne({userName:userName})
                .then(function(customerData){
                    if(customerData==null){
                         res.json({msg:"invalid username"})
                         return;
                    }
                    //if username matches 

                    const password=req.body.password;
                    bcryptjs.compare(password, customerData.password, function(err, result){
                        if(result==false){
                            return res.json({msg:"invalid password"})
                        }
                        // if username and password matches
                            const token=jwt.sign({customerId:customerData._id}, "mysecretkey");
                            res.json({token:token, customerData, msg:"token given"})
                            // console.log(token)
                    })
                            
                    
                            
                            

            })
    });

export default router;

   