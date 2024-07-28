import deleteImage from "../utils/deleteImage.js"
import AppError from "../utils/Error.js"


const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            const modelName=req.originalUrl.split('/')[3]
            if(req.file){
                deleteImage(modelName,req.file.filename)
            }
            if(req.files?.mainImage){
                
                    deleteImage(modelName,req.files.mainImage[0].filename)
                    
                };
            
            if(req.files?.coverImage){
                req.files.coverImage.forEach(element => {
                    deleteImage(modelName,element.filename)
                    
                });
            }
            
            return next(new AppError(err.message,500))
            //res.status(500).json({message:"error",error:err.message})
        })
    }
}


export default asyncHandler