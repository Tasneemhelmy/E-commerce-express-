import { Router } from "express";
import * as categoryController from './controller/Category.controller.js'
import { customVaildation, uploads } from "../../middleware/fileUpload.js";
import SubCategoryRouter from '../SubCategory/subCategory.route.js'
import vaildateSchema from "../../middleware/vaildate.js";
import { addCategorySchema } from "./controller/categoryScema.js";



const router=Router()
router.get('/',categoryController.getCategories)
    .post('/',uploads(customVaildation.image,'category').single('image'),vaildateSchema(addCategorySchema),categoryController.addCatogery)
    .get('/:id',categoryController.getCategory)
    .put('/:id',uploads(customVaildation.image,'category').single('image'),categoryController.updateCategory)
    .delete('/:id',categoryController.deleteCategory)
    .use('/:id/SubCategory',SubCategoryRouter)
export default router