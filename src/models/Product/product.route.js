import { Router } from "express";
import * as productController from './controller/product.controller.js'
import { customVaildation, uploads } from "../../middleware/fileUpload.js";


const router=Router()
router.post('/',uploads(customVaildation.image,'product').fields([{name:"mainImage",maxCount:1},{name:"coverImage",maxCount:4}]),productController.addProduct)
    .get('/',productController.getProducts)
    .get('/:id',productController.getProduct)
    .put('/:id',uploads(customVaildation.image,'product').fields([{name:"mainImage",maxCount:1},{name:"coverImage",maxCount:4}]),productController.updateProduct)
    .delete('/:id',productController.deleteProduct)
export default router