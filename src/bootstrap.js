import connected from '../DB/connection.js'
import globalError from './middleware/globalError.js'
import categoryRouter from './models/Category/Category.route.js'
import brandRouter from './models/Brand/brand.route.js'
import subcategoryRouter from './models/SubCategory/subCategory.route.js'
import productRouter from './models/Product/product.route.js'
import userRouter from './models/User/user.route.js'
import authRoute from './models/auth/auth.route.js'
import couponRouter from './models/Coupon/Coupon.route.js'
import reviewRouter from './models/Review/review.route.js'
import wishlistRouter from './models/WishList/Wishlist.route.js'
import cartRouter from './models/Cart/cart.route.js'
import orderCart from './models/Order/order.route.js'
import adressRouter from './models/Adress/Adress.route.js'
import dotenv from 'dotenv'
import asyncHandler from './middleware/asyncHandlers.js'
import Stripe from "stripe";


const stripe =new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const bootstrap=(app,express)=>{
    process.on('uncaughtException',(err)=>{
        console.log(err)
    })
    const baseUrl='/api/v1'
    dotenv.config()
    connected()
    
    app.use('/uploads',express.static('uploads'))

    const endpointSecret = "whsec_dx9N21rznrH6w5iHHmW0wNgRyIsCECEP";

    app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    asyncHandler((req, res) => {
        const sig = req.headers["stripe-signature"].toString();
        let event;
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        let checkoutSessionCompleted;
      // Handle the event
        if (event.type == "checkout.session.completed")
        checkoutSessionCompleted = event.data.object;
        else console.log(`Unhandled event type ${event.type}`);

        res.status(200).json({ checkoutSessionCompleted });
    })
);
app.use(express.json())
app.use(`${baseUrl}/Category`,categoryRouter)
app.use(`${baseUrl}/Brand`,brandRouter)
app.use(`${baseUrl}/SubCategory`,subcategoryRouter)
app.use(`${baseUrl}/Product`,productRouter)
app.use(`${baseUrl}/User`,userRouter)
app.use(`${baseUrl}/Auth`,authRoute)
app.use(`${baseUrl}/Coupon`,couponRouter)
app.use(`${baseUrl}/Review`,reviewRouter)
app.use(`${baseUrl}/Wishlist`,wishlistRouter)
app.use(`${baseUrl}/Adress`,adressRouter)
app.use(`${baseUrl}/Cart`,cartRouter)
app.use(`${baseUrl}/Order`,orderCart)
app.use('*',(req,res)=>{
    res.status(404).json({message:'Not Found'})
})
process.on('unhandledRejection',(err)=>{
    console.log(err)
})

app.use(globalError)
}

export default bootstrap