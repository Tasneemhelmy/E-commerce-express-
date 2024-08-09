import Coupon from "../../../../DB/models/coupone.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";



export const addCoupon=asyncHandler(async(req,res,next)=>{
    const exist=await Coupon.findOne({code:req.body.code})
    if(exist){
        return next(new AppError("Coupon Aready Exist",404))
    }
    const newCoupon=await Coupon.create(req.body)
    return res.status(200).json({message:"created",newCoupon})
})

export const getCoupons=asyncHandler(async(req,res,next)=>{
    const coupons=await Coupon.find()
    return (!coupons.length)? next(new AppError("not found coupons",404)):
    res.status(200).json({message:"found",coupons})
})

export const updateCoupon=asyncHandler(async(req,res,next)=>{
    const coupon=await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return (!coupon)? next(new AppError("not found coupon",404)):
    res.status(200).json({message:"updated",coupon})
})

export const deleteCoupon=asyncHandler(async(req,res,next)=>{
    const coupon=await Coupon.findByIdAndDelete(req.params.id)
    return (!coupon)? next(new AppError("not found coupon",404)):
    res.status(200).json({message:"deleted",coupon})
})