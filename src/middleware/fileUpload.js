import multer from 'multer'
import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import AppError from "../utils/Error.js";

export const customVaildation={
    image:["image/png","image/jpeg"]
}

export const uploads=(customVaildation,folderName)=>{
    if(!fs.existsSync(`./uploads/${folderName}`)){
        fs.mkdirSync(`./uploads/${folderName}`)
    }
    const storage=multer.diskStorage({
        destination:function (req,file,cb){
            cb(null,`uploads/${folderName}`)
        },
        filename:function (req,file,cb){
           // console.log(file)
            cb(null,uuidv4()+'_'+ file.originalname)
        }
    })
    const fileFilter=(req,file,cb)=>{
        if(customVaildation.includes(file.mimetype)){
        cb(null,true)
        }
        else  cb(new AppError("Invaild Format",400))
    
    
    }
    const upload=multer({storage,fileFilter})

    return upload
}