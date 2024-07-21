import slugify from "slugify";
import Category from "../../../../DB/models/Category.model.js";
import Subcategory from "../../../../DB/models/SubCategory.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";




export const getSUbCategories=asyncHandler(async(req,res,next)=>{
    console.log(req.params)
    const Subcategories=await Subcategory.find({category:req.params.id}).populate('category');
    if(!Subcategories.length)
        return next(new AppError("Not Found Subcategories",404))
    res.status(200).json({message:"Subcategories",Subcategories})
})

export const addSubCatogery=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const slug=slugify(name)
    const findCatogery= await Category.findById(req.params.id)
    if(!findCatogery)
        return next(new AppError("Not Found Category",404))
    const category=req.params.id
    const SubCategory=await Subcategory.create({name,slug,category});
    res.status(200).json({message:"created",SubCategory})
})


export const getSubcatogery=asyncHandler(async(req,res,next)=>{
    const Subcatogery=await Subcategory.findById(req.params.id).populate('category');
    if(!Subcatogery)
        return next(new AppError("Not Found Subcatogery",404))
    res.status(200).json({message:"Subcatogery",Subcatogery})
})

export const updateSubcatogery=asyncHandler(async(req,res,next)=>{
    const{name}=req.body
    const slug=slugify(name)
    const Subcatogery=await Subcategory.findByIdAndUpdate(req.params.id,{name,slug},{new:true});
    
    (!Subcatogery)? next(new AppError("Not Found Subcatogery",404))
    :res.status(200).json({message:"Updated",Subcatogery})
})

export const deleteSubcatogery=asyncHandler(async(req,res,next)=>{
    
    const Subcatogery=await Subcategory.findByIdAndDelete(req.params.id);
    
    (!Subcatogery)? next(new AppError("Not Found Subcatogery",404))
    :res.status(200).json({message:"deleted",Subcatogery})
})


























































































