import slugify from "slugify";
import Brand from "../../../../DB/models/Brand.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";




export const getBrands=asyncHandler(async(req,res,next)=>{
    const brands=await Brand.find();
    if(!brands.length)
        return next(new AppError("Not Found brands",404))
    res.status(200).json({message:"brands",brands})
})

export const addBrand=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const slug=slugify(name)
    const brand=await Brand.create({name,slug});
    res.status(200).json({message:"created",brand})
})

export const getBrand=asyncHandler(async(req,res,next)=>{
    const brand=await Brand.findById(req.params.id);
    if(!brand)
        return next(new AppError("Not Found brand",404))
    res.status(200).json({message:"brand",brand})
})

export const updateBrand=asyncHandler(async(req,res,next)=>{
    const{name}=req.body
    const slug=slugify(name)
    const brand=await Brand.findByIdAndUpdate(req.params.id,{name,slug},{new:true});
    
    (!brand)? next(new AppError("Not Found brand",404))
    :res.status(200).json({message:"Updated",brand})
})

export const deleteBrand=asyncHandler(async(req,res,next)=>{

    const brand=await Brand.findByIdAndDelete(req.params.id);
    
    (!brand)? next(new AppError("Not Found brand",404))
    :res.status(200).json({message:"deleted",brand})
})