import User from "../../DB/models/User.model.js";
import AppError from "../utils/Error.js";
import asyncHandler from "./asyncHandlers.js";


const userExisit=asyncHandler(async(req,res,next)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if(user)
        return next(new AppError("User Aready Exist🤐",404))

    next()

})

export default userExisit