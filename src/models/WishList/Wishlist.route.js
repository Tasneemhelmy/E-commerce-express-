import { Router } from "express";
import * as wishlistController from './controller/wishlist.controller.js'
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";
const router=Router()

router.post('/',authentication,authorization([roles.USER]),wishlistController.addWishlist)
    .get('/',authentication,authorization([roles.USER]),wishlistController.getWishlist)
    .delete('/',authentication,authorization([roles.USER]),wishlistController.deleteWishlist)



export default router