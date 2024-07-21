import { Router } from "express";
import * as subcategoryController from './controller/subCategory.controller.js'


const router=Router({mergeParams:true})
router.get('/',subcategoryController.getSUbCategories)
    .post('/:id',subcategoryController.addSubCatogery)
    .get('/:id',subcategoryController.getSubcatogery)
    .put('/:id',subcategoryController.updateSubcatogery)
    .delete('/:id',subcategoryController.deleteSubcatogery)
export default router