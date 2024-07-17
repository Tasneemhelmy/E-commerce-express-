import { Router } from "express";
import * as categoryController from './controller/Category.controller.js'


const router=Router()
router.get('/',categoryController.getCategories)
    .post('/',categoryController.addCatogery)
    .get('/:id',categoryController.getCategory)
    .put('/:id',categoryController.updateCategory)
    .delete('/:id',categoryController.deleteCategory)
export default router