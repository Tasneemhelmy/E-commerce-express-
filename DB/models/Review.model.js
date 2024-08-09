import mongoose, { Types } from "mongoose";

const reviewSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    user:{
        type:Types.ObjectId,
        ref:"User",
    },
    product:{
        type:Types.ObjectId,
        ref:"Product",
    }
},{
        timestamps:true,
        versionKey:false
})

const Review=mongoose.model('Review',reviewSchema)

export default Review