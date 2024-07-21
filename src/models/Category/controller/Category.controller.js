import slugify from "slugify";
import fs from 'fs'
import path from "path";
import Category from "../../../../DB/models/Category.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";




export const getCategories=asyncHandler(async(req,res,next)=>{
    const categories=await Category.find()
    if(!categories.length)
        return next(new AppError("Not Found categories",404))
    res.status(200).json({message:"category",categories})
})

export const addCatogery=asyncHandler(async(req,res,next)=>{
    req.body.image=req.file.filename
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
    const slug=slugify(name)

    // let imagePath;
    // if (req.file && req.file.filename) {
    // imagePath = path.join('./uploads', '/category', req.file.filename);
    // }
    const category=await Category.findByIdAndUpdate(req.params.id,{name,slug,image:req.file?.filename},{new:true});
    
    if(!category) next(new AppError("Not Found category",404))


    // if (imagePath) {
    //     fs.unlink(imagePath, (err) => {
    //     if (err) {
    //             console.error('Error deleting image file:', err);
    //             return res.status(500).json({ message: 'Failed to delete image file' });
    //         }
        
    //     res.status(200).json({ message: 'Updated', category });
    //     });
    // } else {
            res.status(200).json({ message: 'Updated', category });
        //}
})

export const deleteCategory=asyncHandler(async(req,res,next)=>{
    
    const category=await Category.findByIdAndDelete(req.params.id);
    
    (!category)? next(new AppError("Not Found category",404))
    :res.status(200).json({message:"deleted",category})
})