import AppError from "../utils/Error.js"


const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            return next(new AppError(err.message,500))
            //res.status(500).json({message:"error",error:err.message})
        })
    }
}

export default asyncHandler