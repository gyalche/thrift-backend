import express from 'express';
import customerRouter from './router/customerRouter.js';
import mongoose from 'mongoose';
import './database/db.js';
import vendorRouter from './router/vendorRouter.js';
//Api config
const app=express();
const port=process.env.PORT || 9000;
const stripe=require("stripe")(process.env.STRIPE_SECRET_TEST)

app.post("/payment", cors(), async (req, res) => {
    let {amount, id}=req.body
    try {
        const payment=await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            description:"Thrift store",
            payment_method:id,
            confirm:true,
        })
        console.log("Payment", payment)
        res.json({
            message:"Payment successful",
            success:true
        })
    }
    catch (e) {
        console.log("error",e)
        res.json({
            message:"payment failed",
            success:false
        })
    }
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(customerRouter);
app.use(vendorRouter);
app.listen(port,()=>{
    console.log(`running on localhost ${port}`);
});






