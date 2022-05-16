import express from 'express';
import customerRouter from './router/customerRouter.js';
import mongoose from 'mongoose';
import './database/db.js';
import vendorRouter from './router/vendorRouter.js';
//Api config
const app=express();
const port=process.env.PORT || 9000;



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(customerRouter);
app.use(vendorRouter);
app.listen(port,()=>{
    console.log(`running on localhost ${port}`);
});





