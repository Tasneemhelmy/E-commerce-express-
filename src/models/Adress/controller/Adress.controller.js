import User from "../../../../DB/models/User.model.js";
import asyncHandler from "../../../middleware/asyncHandlers.js";
import roles from "../../../types/roles.js";
import AppError from "../../../utils/Error.js";



export const getAdress=asyncHandler(async(req,res,next)=>{
    const adress=await User.findById(req.user._id)
    if(!adress||!adress.Adress.length)
        return next(new AppError("not found adress",404))
    res.status(200).json({message:"found",adress})
})

export const addAdress=asyncHandler(async(req,res,next)=>{
    const adress=await User.findByIdAndUpdate(req.user._id,{
        $push:{Adress:req.body.adress}
    },{new:true})
    if(!adress)
        return next(new AppError("not found adress",404))
    res.status(200).json({message:"Adress Added",adress})
})


export const updateAdress=asyncHandler(async(req,res,next)=>{
    const adress=await User.findById(req.user._id)
    if(!adress)
        return next(new AppError("not found User",404))
    let found=false
    adress.Adress.forEach(async(el)=>{
        if(el._id==req.params.id){
            found=true
            el.city=req.body.adress.city||el.city
            el.street=req.body.adress.street||el.street
        }

})
if(!found)
    return next(new AppError("not found adress",404))

await adress.save()
    res.status(200).json({message:"Adress updated",adress})
})

export const deleteAdress=asyncHandler(async(req,res,next)=>{
    const adress=await User.findByIdAndUpdate(req.user._id,{
        $pull:{
            Adress:{_id:req.params.id}}
    },{new:true})
    if(!adress)
        return next(new AppError("adress not found",404))
    res.status(200).json({message:"deleted",adress})
    
})