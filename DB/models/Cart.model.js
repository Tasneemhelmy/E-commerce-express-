import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
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
    subTotal:{
        type:Number,
        min:0,
        default:0

    },
    discount:{
        type:Number,
        default:0
    },
    total:{
        type:Number,
        min:0,
        default:0
    }
})

const Cart=mongoose.model('Cart',cartSchema)

export default Cart