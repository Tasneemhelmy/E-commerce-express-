import { Router } from "express";
import * as categoryController from './controller/Category.controller.js'
import { customVaildation, uploads } from "../../middleware/fileUpload.js";
import SubCategoryRouter from '../SubCategory/subCategory.route.js'
import vaildateSchema from "../../middleware/vaildate.js";
import { addCategorySchema } from "./controller/categoryScema.js";
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";



const router=Router()
router.get('/',authentication,authorization([roles.ADMIN,roles.USER]),categoryController.getCategories)
    .post('/',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'category').single('image'),vaildateSchema(addCategorySchema),categoryController.addCatogery)
    .get('/:id',authentication,authorization([roles.ADMIN,roles.USER]),categoryController.getCategory)
    .put('/:id',authentication,authorization([roles.ADMIN]),uploads(customVaildation.image,'category').single('image'),categoryController.updateCategory)
    .delete('/:id',authentication,authorization([roles.ADMIN]),categoryController.deleteCategory)
    .use('/:id/SubCategory',authentication,authorization([roles.ADMIN,roles.USER]),SubCategoryRouter)
export default router