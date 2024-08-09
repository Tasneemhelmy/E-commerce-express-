import mongoose from "mongoose";

const couponSchema= new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    discount:{
        type:Number,
        required:true
    },
    expireDate:{
        type:Date,
        required:true
    }
},{
        timestamps:true,
        versionKey:false
})

const Coupon=mongoose.model('Coupon',couponSchema)

export default Coupon