
import connected from '../DB/connection.js'
import globalError from './middleware/globalError.js'
import categoryRouter from './models/Category/Category.route.js'
import brandRouter from './models/Brand/brand.route.js'
import subcategoryRouter from './models/SubCategory/subCategory.route.js'
const bootstrap=(app,express)=>{
    process.on('uncaughtException',(err)=>{
        console.log(err)
    })
    const baseUrl='/api/v1'

    connected()
    app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(`${baseUrl}/Category`,categoryRouter)
app.use(`${baseUrl}/Brand`,brandRouter)
app.use(`${baseUrl}/SubCategory`,subcategoryRouter)
app.use('*',(req,res)=>{
    res.status(404).json({message:'Not Found'})
})
process.on('unhandledRejection',(err)=>{
    console.log(err)
})

app.use(globalError)
}

export default bootstrap