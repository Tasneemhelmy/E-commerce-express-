import slugify from "slugify";
import Category from "../../../../DB/models/Category.model.js";
import Product from "../../../../DB/models/Product.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import deleteImage from "../../../utils/deleteImage.js";




export const getProducts=asyncHandler(async(req,res,next)=>{
    // const products=await Product.find().populate([
    //     {
    //         path:'category'
    //     }, {
    //         path:'subcategory'
    //     }, {
    //         path:'brand'
    //     }
    // ]);
    
let ApiFeature= new ApiFeatures(Product.find(),req.query)
ApiFeature=ApiFeature.pagination().sort().fields().search('title','description')
const products=await ApiFeature.mongooseQuery
    if(!products.length)
        return next(new AppError("Not Found products",404))
    res.status(200).json({message:"products",products})
})

export const addProduct=asyncHandler(async(req,res,next)=>{
    if(req.files?.mainImage?.length)
        req.body.mainImage=req.files?.mainImage[0].filename
    req.body.coverImage=req.files?.coverImage?.map(element=>element.filename)
    const {title}=req.body
    req.body.slug=slugify(title)
    const product=await Product.create(req.body);
    res.status(200).json({message:"created",product})
})

export const getProduct=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.id).populate([
        {
            path:'category'
        },
        {
            path:'subcategory'
        }, 
        {
            path:'brand'
        }
    ]);
    if(!product)
        return next(new AppError("Not Found product",404))
    res.status(200).json({message:"product",product})
})


export const updateProduct=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product)
        return next(new AppError("Not Found product",404))
    if(req.files?.mainImage?.length ){
        req.body.mainImage=req.files?.mainImage[0].filename
        if(product.mainImage)
            deleteImage('product',product.mainImage)
    }
        
    if(req.files?.coverImage?.length){
        req.body.coverImage=req.files?.coverImage?.map(element=>element.filename)
        if(product.coverImage){
            product.coverImage.forEach(image=>deleteImage('product',image))
        }
        
    }
    const {title}=req.body
    req.body.slug=slugify(title)
    product.set(req.body)
    await product.save()
    res.status(200).json({message:"updated",product})

})


export const deleteProduct=asyncHandler(async(req,res,next)=>{
    
    const product=await Product.findByIdAndDelete(req.params.id);
    if(!product)
        return next(new AppError("Not Found product",404))

    if(product.mainImage){
        deleteImage('product',product.mainImage)
    }
    if(product.coverImage){
        product.coverImage.forEach(element=> {
            deleteImage('product',element)
        })
    }

    return res.status(200).json({message:"deleted",product})
})