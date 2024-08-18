import Cart from "../../../../DB/models/Cart.model.js";
import Product from "../../../../DB/models/Product.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import roles from "../../../types/roles.js";
import AppError from "../../../utils/Error.js";
import Coupon from "../../../../DB/models/coupone.model.js";


async function calc(cart) {
const supTotal=cart.products.reduce((prev,element)=>prev+=element.quantity*element.price,0)
cart.subTotal=supTotal
if(cart.discount==0){
    cart.total=supTotal
}else{
    cart.total=supTotal-(supTotal*cart.discount/100)
}
await cart.save() 
}

export const getCart=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOne({user:req.user._id})
    if(!cart){
        return next(new AppError("You have not cart",400))
    }
    res.status(200).json({"message":cart})
    
})

export const addCart=asyncHandler(async(req,res,next)=>{
    const cartt=await Cart.findOne({user:req.user._id})
    if(!cartt){
        const newCart=await Cart.create({user:req.user._id})

        const product =await Product.findById(req.body.product)
        if(!product)
            return next(new AppError("product not found",404))
        if(product.stock<req.body.quantity)
            return next(new AppError("Out Of Stock",400))

        newCart.products.push({product:req.body.product,quantity:req.body.quantity,price:product.priceAfterDiscount})
        await newCart.save()
        calc(newCart)
        return res.status(201).json({message:"cart created",newCart})
    }
    else{
    const product =await Product.findById(req.body.product)
    if(!product)
        return next(new AppError("product not found",404))
    if(product.stock<req.body.quantity)
        return next(new AppError("Out Of Stock",400))
    let found=false
    cartt.products.forEach(async(el)=>{
        if(el.product==req.body.product){
            found=true
            if(product.stock< el.quantity+req.body.quantity)
                return next(new AppError("Out Of Stock",400))
            el.quantity=req.body.quantity+el.quantity
        
        }
    })
    if(found){
        await cartt.save()
        calc(cartt)
        return res.status(201).json({message:"done",cartt})
    }
    if(found==false)
        if(product.stock<req.body.quantity)
            return next(new AppError("Out Of Stock",400))
        cartt.products.push({product:req.body.product,quantity:req.body.quantity,price:product.priceAfterDiscount})
    await cartt.save()
    calc(cartt)
    res.status(201).json({message:"Cart Adeded",cartt})

}
})

export const applyCopoune=asyncHandler(async(req,res,next)=>{
    const copoune=await Coupon.findOne({code:req.body.code,expireDate:{$gte:Date.now()}})
    if(!copoune)
        return next(new AppError("Invalid Coupon",400))
    const cart=await Cart.findOne({user:req.user._id})
    if(!cart)
        return next(new AppError("cart not found",404))
    cart.discount=copoune.discount
    await cart.save()
    calc(cart)
    res.status(201).json({message:"Hurray! You got a discount!",cart})

})


export const deleteCart=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOneAndDelete({user:req.user._id})
    if(!cart)
        return next(new AppError("Cart not found",404))
    res.status(200).json({message:"deleted",cart})
    
})

export const deleteProduct=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOneAndUpdate({user:req.user._id},{
        $pull:{products:{_id:req.params.id}},
    },{new:true})
    if(!cart)
        return next(new AppError("cart not found",404))
    calc(cart)
    res.status(200).json({message:"The item has been removed",cart})
})

export const updateQuantity=asyncHandler(async(req,res,next)=>{
    const cartt=await Cart.findOne({user:req.user._id})
    if(!cartt){
        const newCart=await Cart.create({user:req.user._id})
    }
    let found=false
    cartt.products.forEach(async(el)=>{
        if(el.product==req.params.id){
            found=true
            el.quantity=req.body.quantity
        }
    })
    const product=await Product.findOne({_id:req.params.id})
            if(!product)
                return next(new AppError("product not found ",404))
            if(product.stock<req.body.quantity )
                return next(new AppError("Out Of Stock",400))
    if(found){
        await cartt.save()
        calc(cartt)
        return res.status(201).json({message:"Quantity Updated",cartt})
    }
        return next(new AppError("product not found in the cart",404))
})
