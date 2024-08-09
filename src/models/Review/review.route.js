import { Router } from "express";
import * as reviewController from './controller/review.controller.js'
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";
const router=Router()

router.post('/',authentication,authorization([roles.USER]),reviewController.addReview)
    .get('/',authentication,authorization([roles.ADMIN,roles.USER]),reviewController.getReviews)
    .put('/:id',authentication,authorization([roles.ADMIN,roles.USER]),reviewController.updateReview)
    .delete('/:id',authentication,authorization([roles.ADMIN,roles.USER]),reviewController.deleteReview)



export default router