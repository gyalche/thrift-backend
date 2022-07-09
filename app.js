// import express from 'express';
// import customerRouter from './router/customerRouter.js';
// import mongoose from 'mongoose';
// import './database/db.js';
// import vendorRouter from './router/vendorRouter.js';
// //Api config
// const app=express();
// const port=process.env.PORT || 9000;
// const stripe=require("stripe")(process.env.STRIPE_SECRET_TEST)

// app.post("/payment", cors(), async (req, res) => {
//     let {amount, id}=req.body
//     try {
//         const payment=await stripe.paymentIntents.create({
//             amount,
//             currency:"USD",
//             description:"Thrift store",
//             payment_method:id,
//             confirm:true,
//         })
//         console.log("Payment", payment)
//         res.json({
//             message:"Payment successful",
//             success:true
//         })
//     }
//     catch (e) {
//         console.log("error",e)
//         res.json({
//             message:"payment failed",
//             success:false
//         })
//     }
// })

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// app.use(customerRouter);
// app.use(vendorRouter);
// app.listen(port,()=>{
//     console.log(`running on localhost ${port}`);
// });



/* 

================== Most Important ==================
* Issue 1 :
In uploads folder you need create 3 folder like bellow.
Folder structure will be like: 
public -> uploads -> 1. products 2. customize 3. categories
*** Now This folder will automatically create when we run the server file

* Issue 2:
For admin signup just go to the auth 
controller then newUser obj, you will 
find a role field. role:1 for admin signup & 
role: 0 or by default it for customer signup.
go user model and see the role field.

*/

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Router
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const brainTreeRouter = require("./routes/braintree");
const orderRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const customizeRouter = require("./routes/customize");
// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");
const CreateAllFolder = require("./config/uploadFolderCreateScript");

/* Create All Uploads Folder if not exists | For Uploading Images */
CreateAllFolder();

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", brainTreeRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});



