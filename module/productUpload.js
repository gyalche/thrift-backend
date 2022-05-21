import mongoose from 'mongoose';

const productUpload=new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendor'
    },
    desc:{
        type:String,
    },
    productName:{
        type:String,
    },
    pimage:{
        type:String,
    },
    sellerName:{
        type:String,
    }
});
export default mongoose.model('productUpload', productUpload);