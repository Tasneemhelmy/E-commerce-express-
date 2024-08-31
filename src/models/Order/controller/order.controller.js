import asyncHandler from "../../../middleware/asyncHandlers.js";
import Cart from "../../../../DB/models/Cart.model.js";
import Product from "../../../../DB/models/Product.model.js";
import Order from "../../../../DB/models/Order.model.js";
import AppError from "../../../utils/Error.js";
import Stripe from "stripe";


const stripe =new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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

if(req.body.paymentMethod=='card'){

const YOUR_DOMAIN = 'http://localhost:4242';


    const session = await stripe.checkout.sessions.create({
    line_items: [
        {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data:{
            currency: 'egp',
            unit_amount: order.total*100,
            product_data:{
                name:"tast",
                description:"dec",

            }

            
        },
        quantity: 1,
        },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    client_reference_id:req.user._id,

});

return res.status(200).json({session})

}

    res.status(201).json({message:"created",order})


})