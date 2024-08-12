import { Router } from "express";
import * as cartController from './controller/cart.controller.js'
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";
const router=Router()

router.post('/',authentication,authorization([roles.USER]),cartController.addCart)
    .get('/',authentication,authorization([roles.USER]),cartController.getWishlist)
    .delete('/',authentication,authorization([roles.USER]),cartController.deleteWishlist)



export default router