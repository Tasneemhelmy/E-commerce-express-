import { Router } from "express";
import * as brandController from './controller/brand.controller.js'


const router=Router()
router.get('/',brandController.getBrands)
    .post('/',brandController.addBrand)
    .get('/:id',brandController.getBrand)
    .put('/:id',brandController.updateBrand)
    .delete('/:id',brandController.deleteBrand)
export default router