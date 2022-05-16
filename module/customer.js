import mongoose from "mongoose";

const customer=mongoose.model('customer',{

    userName:{
        type:String,
    },
    phoneNumber:{
       type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    image:{
        type:String,
    }
})

export default customer;