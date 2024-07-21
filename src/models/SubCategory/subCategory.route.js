import { Router } from "express";
import * as subcategoryController from './controller/subCategory.controller.js'
import { customVaildation, uploads } from "../../middleware/fileUpload.js";


const router=Router({mergeParams:true})
router.get('/',subcategoryController.getSUbCategories)
    .post('/:id',uploads(customVaildation.image,'subcategory').single('image'),subcategoryController.addSubCatogery)
    .get('/:id',subcategoryController.getSubcatogery)
    .put('/:id',uploads(customVaildation.image,'subcategory').single('image'),subcategoryController.updateSubcatogery)
    .delete('/:id',subcategoryController.deleteSubcatogery)
export default router