import fs from 'fs'
import path from "path";

const deleteImage=(modelNama,image)=>{
    let imageName
    if(image?.startsWith('http')){
        imageName=image.split('/')[5]
    }else{
        imageName=image
    }


    const imagePath = path.join('uploads/', modelNama, imageName);
    
    if(fs.existsSync(imagePath))
        fs.unlinkSync(imagePath)
}

export default deleteImage