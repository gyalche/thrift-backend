import multer from 'multer';

//code to upload image
const storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./gallary");
    },
    filename:function(req, file, cb){
        // console.log(file);
        cb(null, Date.now() + file.originalname);
    }
})

//now we need to check the file format;

const filter=function(req, file, cb){
    if(file.mimetype=="image/png" || file.mimetype=="image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload=multer({
    storage:storage,
    fileFilter:filter,
})
export default upload;