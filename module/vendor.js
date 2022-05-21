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
    },
    role:{
        type:String,
        enum:['customer', 'vendor'],
        default:'vendor',
    }
})

export default vendor;