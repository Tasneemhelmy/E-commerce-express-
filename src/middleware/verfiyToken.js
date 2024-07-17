import jwt from'jsonwebtoken'

export const verfiyToken=(req,res,next)=>{
    const authorization= req.headers.authorization
        const token=authorization.split('Bearer ')[1]
        const payload=jwt.verify(token,'tasneem')
        if(!payload)
            return res.status(404).json({message:"Invaild Payload"})

        req.user=payload

        next()
}

export default verfiyToken