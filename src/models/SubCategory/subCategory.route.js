import { Router } from "express";
import * as subcategoryController from './controller/subCategory.controller.js'
import { customVaildation, uploads } from "../../middleware/fileUpload.js";
import { addSubCategorySchema } from "./controller/subCategorySchema.js";
import vaildateSchema from "../../middleware/vaildate.js";
import { authentication,authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";


const router=Router({mergeParams:true})
router.get('/',authentication,authorization([roles.ADMIN,roles.USER]),subcategoryController.getSUbCategories)
    .post('/:id',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'subcategory').single('image'),vaildateSchema(addSubCategorySchema),subcategoryController.addSubCatogery)
    .get('/:id',authentication,authorization([roles.ADMIN,roles.USER]),subcategoryController.getSubcatogery)
    .put('/:id',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'subcategory').single('image'),subcategoryController.updateSubcatogery)
    .delete('/:id',authentication,authorization([roles.ADMIN]),subcategoryController.deleteSubcatogery)
export default router