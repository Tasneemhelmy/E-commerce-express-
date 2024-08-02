import mongoose, { Types } from "mongoose";
import roles from "../../src/types/roles.js";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"],
        trim: true,
        unique:[true,"Name is unique"],
        maxlength:[25,"Name should be less than 25 characters"],
        minlength:[2,"Name should be greater than 2 characters"]
    },
    email: {
        type: String,
        required: [true,"email is unique"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"password is unique"]
    },
    role: {
        type: String,
        enum: Object.values(roles),
        required: [true,"role is unique"],
        default: roles.USER

    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default:"offline"
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    resetToken:{
        type:Date
    }

},{
    timestamps:true,
    versionKey:false
})
// userSchema.post('find', function(docs) {
//     if (Array.isArray(docs)) {
//         docs.forEach(doc => {
//             if (doc.image) {
//                 doc.image = 'http://localhost:3000/uploads/category/' + doc.image;
//             }

            
//         });
//     } else {
//         if (docs.image) {
//             docs.image = 'http://localhost:3000/uploads/category/' + docs.image;
//         }

        
//     }
// });
const User=mongoose.model("User",userSchema);

export default User