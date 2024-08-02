import slugify from "slugify";
import Brand from "../../../../DB/models/Brand.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import deleteImage from '../../../utils/deleteImage.js'




export const getBrands=asyncHandler(async(req,res,next)=>{
    let apiFeature=new ApiFeatures(Brand.find(),req.query)
    apiFeature=apiFeature.pagination().sort().fields().search('name','slug').filter()
    const brands= await apiFeature.mongooseQuery
    
    if(!brands.length)
        return next(new AppError("Not Found brands",404))
    res.status(200).json({message:"brands",brands})
})

export const addBrand=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    req.body.slug=slugify(name)
    req.body.image=req.file?.filename
    req.body.createdBy=req.user._id
    const brand=await Brand.create(req.body);
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
    const brand =await Brand.findById(req.params.id)
    if(!brand) return next(new AppError("Not Found brand",404))
        if(req.file) {
            deleteImage('brand',brand.image)
            brand.image=req.file.filename
        }

        brand.name=name|| brand.name
        brand.updatedBy=req.user._id
        if (name) {
            brand.slug = slugify(name);
        }
        await brand.save()
        
        return res.status(200).json({message:"Updated",brand})
})

export const deleteBrand=asyncHandler(async(req,res,next)=>{

    const brand=await Brand.findOneAndDelete({createdBy:req.user._id});
    
    if(!brand) 
        return next(new AppError("Not Found brand",404))
    if(brand.image)
        deleteImage('brand',brand.image)
    return res.status(200).json({message:"deleted",brand})
})