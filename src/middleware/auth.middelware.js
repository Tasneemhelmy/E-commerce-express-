import jwt from 'jsonwebtoken' 
import AppError from '../utils/Error.js'
import asyncHandler from './asyncHandlers.js'
import User from '../../DB/models/User.model.js'

export const authentication=asyncHandler(async(req,res,next)=>{
    const auth=req.headers.authorization
    if(!auth)
        return next(new AppError("Unauthorized",401))
    const token=auth.split('Bearer ')[1]

    const decodedToken=jwt.verify(token,process.env.KEY)
    const user=await User.findById(decodedToken._id)
    if(!user)
        return next(new AppError("Unauthorized2",401))
    if(user.resetToken){
        const trim=parseInt(user.resetToken.getTime()/1000)
        if(trim>decodedToken.iat)
            return next(new AppError("expire token",401))
    }
    req.user=decodedToken
    next()
})

export const authorization=(roles)=>{
    return asyncHandler(async(req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppError("Unauthorized",401))

        next()
    })
}

export const authForAdmin=(role)=>{
    return asyncHandler(async(req,res,next)=>{
        if(role!=='admin')
            return next(new AppError("Unauthorized ",401))
        next()
    })


}