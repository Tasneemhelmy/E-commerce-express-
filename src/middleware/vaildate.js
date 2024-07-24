
const vaildateSchema=(Schema)=>{
    return (req,res,next)=>{
        const objects={
            ...req.body,
            ...req.params,
            ...req.query
        }
        if(req.file){
            objects.file={...req.file}
        }
        if(req.files){
            objects.files={...req.files}
        }
        
        const {error}=Schema.validate(objects,{abortEarly:false})
        if(error){
            return res.status(400).json({message:"valdition error",errors:error.details,status:400})
        }
        return next()
    }
}
export default vaildateSchema