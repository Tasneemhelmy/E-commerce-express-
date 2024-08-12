import Cart from "../../../../DB/models/Cart.model.js";
import Product from "../../../../DB/models/Product.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import roles from "../../../types/roles.js";
import AppError from "../../../utils/Error.js";



export const getWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findById(req.user._id)
    if(!wishlist||!wishlist.wishlist.length)
        return next(new AppError("not found wishlists",404))
    res.status(200).json({message:"found",wishlist})
})

export const addCart=asyncHandler(async(req,res,next)=>{
    const {price}=req.body
    const cart=await Cart.findOne({user:req.user._id})
    if(!cart){
        const newCart=await Cart.create({user:req.user._id})

        const product =await Product.findById(req.body.product)
        if(!product)
            return next(new AppError("product not found",404))
        if(product.stock<req.body.quantity)
            return next(new AppError("Out Of Stock",400))

        newCart.products.push({product:req.body.product,quantity:req.body.quantity,price})
        await newCart.save()
        return res.status(201).json({message:"cart created",newCart})
    }
    const product =await Product.findById(req.body.product)
    if(!product)
        return next(new AppError("product not found",404))
    if(product.stock<req.body.quantity)
        return next(new AppError("Out Of Stock",400))
    let found=false
    cart.products.forEach(async(el)=>{
        if(el.product==req.body.product){
            found=true
            if(product.stock< el.quantity+req.body.quantity)
                return next(new AppError("Out Of Stock",400))
            el.quantity+=req.body.quantity
            return res.status(201).json({message:"done",cart})
            
        }
    })
    if(!found)
        if(product.stock<req.body.quantity)
            return next(new AppError("Out Of Stock",400))
        cart.products.push({product:req.body.product,quantity:req.body.quantity,price})
    await cart.save()
    res.status(201).json({message:"done",cart})

})


export const deleteWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findByIdAndUpdate(req.user._id,{
        $pull:{wishlist:req.body.product}
    },{new:true})
    if(!wishlist)
        return next(new AppError("wishlist not found",404))
    res.status(200).json({message:"deleted",wishlist})
    
})