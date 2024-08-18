import asyncHandler from "../../../middleware/asyncHandlers.js";
import Cart from "../../../../DB/models/Cart.model.js";
import Product from "../../../../DB/models/Product.model.js";
import Order from "../../../../DB/models/Order.model.js";
import AppError from "../../../utils/Error.js";



export const addCashOrder=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOne({user:req.user._id})
    if(!cart)
        return next(new AppError("Cart not found",404))
    if(!cart.products.length)
        return next(new AppError("Cart is empty",400))


    cart.products.forEach(async(el)=>{
        const product=await Product.findById(el.product)
        if(!product)
            return next(new AppError(`not found product ${el.product}`,404))
        if(product.stock<el.quantity)
            return next(new AppError(`stock not vaild ${el.product},vaild ${product.stock}`,404))

    })

    cart.products.forEach(async(el)=>{
    await Product.findByIdAndUpdate(el.product,{
        $inc:{sold:el.quantity,stock:-el.quantity}
    })
    })

    req.body.total=cart.total
    req.body.products=cart.products
    req.body.user=req.user._id
    const order=await Order.create(req.body)
    await Cart.findOneAndDelete({user:req.user._id})
    res.status(201).json({message:"created",order})


})