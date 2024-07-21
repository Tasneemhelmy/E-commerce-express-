import mongoose, { Types } from "mongoose";

const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"],
        trim:true,
        unique:[true,"Name is unique"],
        maxlength:[25,"Name should be less than 25 characters"],
        minlength:[2,"Name should be greater than 2 characters"]
    },
    image: String,
    createdBy: {
        type: Types.ObjectId,
        // require:[true,"createdBy is required"],
        // ref: "User",
    },
    updatedBy: {
        type: Types.ObjectId,
        // ref: "User",
    },
    slug:{
        type:String,
        required:[true,"Slug Is Required"],
        lowerCase:"true"
    }
},{
    timestamps:true,
    versionKey:false
})
brandSchema.post('init',(doc)=>{
    if(doc.image)
        doc.image='http://localhost:3000/uploads/brand/'+doc.image
})


const Brand=mongoose.model("Brand",brandSchema);

export default Brand