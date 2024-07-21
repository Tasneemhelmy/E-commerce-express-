import { Router } from "express";
import * as brandController from './controller/brand.controller.js'
import { uploads,customVaildation } from "../../middleware/fileUpload.js";


const router=Router()
router.get('/',brandController.getBrands)
    .post('/',uploads(customVaildation.image,'brand').single('image'),brandController.addBrand)
    .get('/:id',brandController.getBrand)
    .put('/:id',uploads(customVaildation.image,'brand').single('image'),brandController.updateBrand)
    .delete('/:id',brandController.deleteBrand)
export default router