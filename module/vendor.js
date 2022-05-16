import mongoose from "mongoose";

const vendor=mongoose.model('vendor',{
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

export default vendor;