import mongoose from "mongoose";
const connected=()=>{
    
    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(err)
    })
}
export default connected