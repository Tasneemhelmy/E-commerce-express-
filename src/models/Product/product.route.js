import { Router } from "express";
import * as productController from './controller/product.controller.js'
import { customVaildation, uploads } from "../../middleware/fileUpload.js";
import vaildateSchema from "../../middleware/vaildate.js";
import { addProductSchema } from "./controller/productScema.js";
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";


const router=Router()
router.post('/',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'product').fields([{name:"mainImage",maxCount:1},{name:"coverImage",maxCount:4}]),vaildateSchema(addProductSchema),productController.addProduct)
    .get('/',authentication,authorization([roles.ADMIN,roles.USER]),productController.getProducts)
    .get('/:id',authentication,authorization([roles.ADMIN,roles.USER]),productController.getProduct)
    .put('/:id',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'product').fields([{name:"mainImage",maxCount:1},{name:"coverImage",maxCount:4}]),productController.updateProduct)
    .delete('/:id',authentication,authorization([roles.ADMIN]),productController.deleteProduct)
export default router