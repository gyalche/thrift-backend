import express from 'express';
import productUpload from '../module/productUpload'
import {verifyVendor} from '../auth/auth.js';
import upload from '../file/file.js';

const router=new express.Router();
//porduct insert
router.post('/product/insert', upload.single('pimage'),verifyVendor, function(req, res){
    const desc=req.body.desc;
    const uid=req.vendorInfo._id;
    const sellerName=req.body.sellerName;
    const productName=req.body.productName;
    const price=req.body.price;
    const pimage=req.body.pimage;

    const productData=new productUpload({
        desc:desc,
        uid:uid,
        sellerName:sellerName,
        productName:productName,
        pimage:pimage,
        price:price,
    })
    console.log(productData);
    productData.save().then(function(){
        res.json({msg:"sucessfully added", success:true});
    }).catch(function(){
        res.json({msg:"unable to add product"});
    })

}),

//product delete;

router.delete("/product/delete/:pid", verifyVendor, function(req, res){
    const pid=req.params.pid;
    productUpload.findByIdAndDelete(pid).then(function(req, res){
        res.json({msg:"successfully deleted"})
    })
    .catch(function(err){
        res.json({error:err})
    })
});

//view all of my products
router.get('/product/myproduct', verifyVendor, function(req, res){
    productUpload.find({uid:req.vendorInfo._id}).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json({msg:"something went wrong"})
    })
})
// view all products
router.get('/product/allproducts', function(req, res){
    productUpload.find().then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json({msg:"something went wrong"})
    })
})

//view single product
router.get('/product/single/:pid', verifyVendor, function(req, res){
    productUpload.find({_id:req.params.pid})
                .then(function(data){
                    res.json(data);
                })
                .catch(function(err){
                    res.json({msg:"something went wrong"})
                })
})
//update product;

router.put('/products/update/:pid',verifyVendor, function(req, res){
    const productName=req.body.productName;
    const desc=req.body.desc;
    const pimage=req.file.filename;
    const sellerName=req.file.sellerName;
    const price=req.body.price;
    const pid=req.params.pid;

    productUpload.findOneAndUpdate({_id:pid},{
        productName:productName,
        desc:desc,
        pimage:pimage,
        price:price,
        sellerName:sellerName
    }).then(()=>{
        res.json({success:'sucess'})
    })

})
export default router;