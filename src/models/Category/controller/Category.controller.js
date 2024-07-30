import slugify from "slugify";
import Category from "../../../../DB/models/Category.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";
import deleteImage from "../../../utils/deleteImage.js";
import ApiFeatures from "../../../utils/apiFeatures.js";




export const getCategories=asyncHandler(async(req,res,next)=>{
    
    let apiFeature=new ApiFeatures(Category.find(),req.query)
    apiFeature=apiFeature.pagination().sort().fields().search('name','slug')
    const categories= await apiFeature.mongooseQuery
    if(!categories.length)
        return next(new AppError("Not Found categories",404))
    res.status(200).json({message:"category",categories})
})

export const addCatogery=asyncHandler(async(req,res,next)=>{
    req.body.image=req.file?.filename
    const {name,image}=req.body
    const slug=slugify(name)
    const category=await Category.create({name,slug,image});
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
    const category =await Category.findById(req.params.id)
    if(!category) return next(new AppError("Not Found brand",404))
        if(req.file) {
            deleteImage('category',category.image)
            category.image=req.file.filename
        }

        category.name=name|| category.name
        if (name) {
            category.slug = slugify(name);
        }
        await category.save()
        
        return res.status(200).json({message:"Updated",category})
})

export const deleteCategory=asyncHandler(async(req,res,next)=>{
    
    const category=await Category.findByIdAndDelete(req.params.id);
    
    if(!category) return next(new AppError("Not Found category",404))
        if(category.image)
            deleteImage('category',category.image)
    return res.status(200).json({message:"deleted",category})
})