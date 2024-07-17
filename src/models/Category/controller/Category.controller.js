import slugify from "slugify";
import Category from "../../../../DB/models/Category.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";




export const getCategories=asyncHandler(async(req,res,next)=>{
    const categories=await Category.find();
    if(!category.length)
        return next(new AppError("Not Found categories",404))
    res.status(200).json({message:"category",categories})
})

export const addCatogery=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const slug=slugify(name)
    const category=await Category.create({name,slug});
    res.status(200).json({message:"created",category})
})

export const getCategory=asyncHandler(async(req,res,next)=>{
    const category=await Category.findById(req.params.id);
    if(!category)
        return next(new AppError("Not Found category",404))
    res.status(200).json({message:"category",category})
})

export const updateCategory=asyncHandler(async(req,res,next)=>{
    const{name}=req.body
    const slug=slugify(name)
    const category=await Category.findByIdAndUpdate(req.params.id,{name,slug},{new:true});
    
    (!category)? next(new AppError("Not Found category",404))
    :res.status(200).json({message:"Updated",category})
})

export const deleteCategory=asyncHandler(async(req,res,next)=>{
    
    const category=await Category.findByIdAndDelete(req.params.id);
    
    (!category)? next(new AppError("Not Found category",404))
    :res.status(200).json({message:"deleted",category})
})