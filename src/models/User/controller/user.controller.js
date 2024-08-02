import bcryptjs from "bcryptjs";
import User from "../../../../DB/models/User.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import AppError from "../../../utils/Error.js";


                 //3-update account.
export const updateAcc=asyncHandler(async(req,res,next)=>{
    const{email,name}=req.body
                
    const user=await User.findById(req.user._id)
        if(!user)
            return next(new AppError("Not Authorized To Acsess This Acount",400))
        user.name=name|| user.name
        user.email=email|| user.email
        await user.save()
                
    return res.status(201).json({message:"updated",user})
                
})
//-------------------------------------------------------------------------------
                
                        //4-Delete account
export const deleteAcc=asyncHandler(async(req,res,next)=>{ 
                                        
    const user=await User.findByIdAndDelete(req.user._id)
    if(!user)
        return next(new AppError("Not Authorized To Acsess This Acount",400))

    return res.status(201).json({message:"Deleted",user})
                                        
})
//-------------------------------------------------------------------------------

export const changePassword=asyncHandler(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body;
    const user=await User.findById(req.user._id)
    if(!user) 
        return next(new AppError("Unauthorized",401))
    const vaildPass=bcryptjs.compareSync(oldPassword,user.password)
    if(!vaildPass)
        return next(new AppError("Invalid old password",401))
    if(newPassword!==confirmPassword)
        return next(new AppError("Passwords donot match",401))
    await user.updateOne({
        password:bcryptjs.hashSync(newPassword,12),
        resetToken:new Date(),
    },{new:true})
    res.status(200).json({message:"Password changed successfully",user})
})