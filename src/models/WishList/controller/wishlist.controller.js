import User from "../../../../DB/models/User.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import roles from "../../../types/roles.js";
import AppError from "../../../utils/Error.js";



export const getWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findById(req.user._id)
    if(!wishlist||!wishlist.wishlist.length)
        return next(new AppError("not found wishlists",404))
    res.status(200).json({message:"found",wishlist})
})

export const addWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findByIdAndUpdate(req.user._id,{
        $addToSet:{wishlist:req.body.product}
    },{new:true})
    if(!wishlist)
        return next(new AppError("not found wishlists",404))
    res.status(200).json({message:"added to wishlist",wishlist})
})


export const deleteWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findByIdAndUpdate(req.user._id,{
        $pull:{wishlist:req.body.product}
    },{new:true})
    if(!wishlist)
        return next(new AppError("wishlist not found",404))
    res.status(200).json({message:"deleted",wishlist})
    
})