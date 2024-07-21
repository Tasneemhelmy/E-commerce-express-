import mongoose, { Types } from "mongoose";

const subcategorySchema=new mongoose.Schema({
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
    category:{
        type: Types.ObjectId,
        require:[true,"category is required"],
        ref: "Category"
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
subcategorySchema.post('init',(doc)=>{
    if(doc.image)
        doc.image='http://localhost:3000/uploads/subcategory/'+doc.image
})

const Subcategory=mongoose.model("Subcategory",subcategorySchema);

export default Subcategory