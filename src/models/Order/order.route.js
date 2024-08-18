import { Router } from "express";
import * as orderController from './controller/order.controller.js'
import { authentication,authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";

const router=Router()

router.post('/',authentication,authorization([roles.USER]),orderController.addCashOrder)
// .post('/applyCoupon',authentication,authorization([roles.USER]),cartController.applyCopoune)
// .get('/',authentication,authorization([roles.USER]),cartController.getCart)
// .delete('/',authentication,authorization([roles.USER]),cartController.deleteCart)
// .put('/:id',authentication,authorization([roles.USER]),cartController.deleteProduct)
// .patch('/:id',authentication,authorization([roles.USER]),cartController.updateQuantity)
export default router