import mongoose, { Types } from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            product:{
                type:Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            price:{
                type:Number,
                required:true,
                default:0
            }

        }
    ],
    total:{
        type:Number,
        min:0,
        default:0
    },
    isPaid:{
    type:Boolean,
    default:false
    },
    isDeleverd:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    deleverdAt:Date,
    paymentMethod:{
        type:String,
        enum:['card','cash'],
        default:'cash'
    },
    Adress:{
        type:String,
        require:true
    },
    phone:String
})

const Order=mongoose.model('Order',orderSchema)

export default Order