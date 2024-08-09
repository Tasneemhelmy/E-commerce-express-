import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import User from "../../../../DB/models/User.model.js";
import AppError from "../../../utils/Error.js";



export const signUp=asyncHandler(async(req,res,next)=>{
    const {name,email,password,role}=req.body;
    const user=await User.create({
        name,
        email,
        password:bcryptjs.hashSync(password,12),
        status:"online",
        role
    });
    const token=jwt.sign({_id:user._id,role:user.role,email:user.email},process.env.KEY)
    res.status(200).json({message:"signUp Successfully",user,token})
    
})

export  const createAdmin=asyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password:bcryptjs.hashSync(password,12),
        status:"online",
        role:"Admin"
    });
    const token=jwt.sign({_id:user._id,role:user.role,email:user.email},process.env.KEY)
    res.status(200).json({message:"signUp Successfully",user,token})
})

export const logIn=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) return next(new AppError("You Must SignUp First",404))
    const isMatch=bcryptjs.compareSync(password,user.password);
if(!isMatch) return next(new AppError("Invalid Password or Username",401))
    const token=jwt.sign({_id:user._id,role:user.role,email:user.email},process.env.KEY)
await user.updateOne({status:"online"})
res.status(200).json({message:"logIn Successfully",token})

})