import { Router } from "express";
import * as couponeController from './controller/Coupon.controller.js'
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";
const router=Router()

router.post('/',authentication,authorization([roles.ADMIN]),couponeController.addCoupon)
    .get('/',authentication,authorization([roles.ADMIN,roles.USER]),couponeController.getCoupons)
    .put('/:id',authentication,authorization([roles.ADMIN]),couponeController.updateCoupon)
    .delete('/:id',authentication,authorization([roles.ADMIN]),couponeController.deleteCoupon)



export default router