import slugify from "slugify";
import Category from "../../../../DB/models/Category.model.js";
import Subcategory from "../../../../DB/models/SubCategory.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import deleteImage from "../../../utils/deleteImage.js";




export const getSUbCategories=asyncHandler(async(req,res,next)=>{
    let apiFeature=new ApiFeatures(Subcategory.find(),req.query)
    apiFeature=apiFeature.pagination().sort().fields().search('name','slug')
    const subcategories= await apiFeature.mongooseQuery.find({category:req.params.id})
    
    if(!subcategories.length)
        return next(new AppError("Not Found Subcategories",404))
    res.status(200).json({message:"Subcategories",subcategories})
})

export const addSubCatogery=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    req.body.image=req.file?.filename
    req.body.slug=slugify(name)
    const findCatogery= await Category.findById(req.params.id)
    if(!findCatogery)
        return next(new AppError("Not Found Category",404))
    req.body.category=req.params.id
    const SubCategory=await Subcategory.create(req.body);
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
    const subcatogery=await Subcategory.findById(req.params.id)
    if(!subcatogery)
        return next(new AppError("Not Found Subcatogery",404))
    if(subcatogery.image && req.file) 
        deleteImage('subcategory',subcatogery.image)
    await Subcategory.findByIdAndUpdate(req.params.id,{name,slug,image:req.file?.filename},{new:true});
    
    return res.status(200).json({message:"Updated",subcatogery})
})

export const deleteSubcatogery=asyncHandler(async(req,res,next)=>{
    
    const Subcatogery=await Subcategory.findByIdAndDelete(req.params.id);
    if(!Subcatogery)
        return next(new AppError("Not Found Subcatogery",404))

    if(Subcatogery.image)
        deleteImage('subcategory',Subcatogery.image)
    return res.status(200).json({message:"deleted",Subcatogery})
    
})


























































































