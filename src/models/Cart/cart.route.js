import { Router } from "express";
import * as cartController from './controller/cart.controller.js'
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";
const router=Router()

router.post('/',authentication,authorization([roles.USER]),cartController.addCart)
    .post('/applyCoupon',authentication,authorization([roles.USER]),cartController.applyCopoune)
    .get('/',authentication,authorization([roles.USER]),cartController.getCart)
    .delete('/',authentication,authorization([roles.USER]),cartController.deleteCart)



export default router