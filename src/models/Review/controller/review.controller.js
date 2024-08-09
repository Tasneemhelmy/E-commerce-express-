import Review from "../../../../DB/models/Review.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import roles from "../../../types/roles.js";
import AppError from "../../../utils/Error.js";



export const addReview=asyncHandler(async(req,res,next)=>{
    req.body.user=req.user._id
    const exist=await Review.findOne({
        product:req.body.product,
        user:req.user._id
    })
    if(exist){
        return next(new AppError("You have already reviewed this product",400))
    }
    const newReview=await Review.create(req.body)
    return res.status(200).json({message:"created",newReview})
})

export const getReviews=asyncHandler(async(req,res,next)=>{
    const reviews=await Review.find()
    return (!reviews.length)? next(new AppError("not found reviews",404)):
    res.status(200).json({message:"found",reviews})
})

export const updateReview=asyncHandler(async(req,res,next)=>{
    const review=await Review.findById(req.params.id)
    if(!review)
        return next(new AppError("review not found",404))
    if(review.user==req.user._id || req.user.role==roles.ADMIN){
        const update=await Review.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return (!update)? next(new AppError("not found review",404)):
        res.status(200).json({message:"updated",update})
    }
    return next(new AppError("you are not authorized to update this review",403))

})

export const deleteReview=asyncHandler(async(req,res,next)=>{
    const review=await Review.findById(req.params.id)
    if(!review)
        return next(new AppError("review not found",404))
    if(review.user==req.user._id || req.user.role==roles.ADMIN){

    const delet=await Review.findByIdAndDelete(req.params.id)
    return (!delet)? next(new AppError("not found review",404)):
    res.status(200).json({message:"deleted",delet})
    }
    return next(new AppError("you are not authorized to delete this review",403))
})