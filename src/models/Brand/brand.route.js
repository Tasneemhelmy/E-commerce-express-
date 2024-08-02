import { Router } from "express";
import * as brandController from './controller/brand.controller.js'
import { uploads,customVaildation } from "../../middleware/fileUpload.js";
import vaildateSchema from "../../middleware/vaildate.js";
import { addBrandSchema } from "./controller/brandSchema.js";
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";



const router=Router()
router.get('/',authentication,authorization([roles.ADMIN,roles.USER]),brandController.getBrands)
    .post('/',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'brand').single('image'),vaildateSchema(addBrandSchema),brandController.addBrand)
    .get('/:id',authentication,authorization([roles.ADMIN,roles.USER]),brandController.getBrand)
    .put('/:id',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'brand').single('image'),brandController.updateBrand)
    .delete('/',authentication,authorization([roles.ADMIN]),brandController.deleteBrand)
export default router