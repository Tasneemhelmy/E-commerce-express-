import { Router } from "express";
import * as authController from './controller/auth.controller.js'
import userExisit from "../../middleware/auth.js";
import vaildateSchema from "../../middleware/vaildate.js";
import { signupSchema } from "../User/controller/UserSchema.js";
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";

const router=Router()
router.post('/signUp',vaildateSchema(signupSchema),userExisit,authController.signUp)
    .post('/forAdmin',authentication,authorization([roles.ADMIN]),vaildateSchema(signupSchema),userExisit,authController.createAdmin)
    .post('/logIn',authController.logIn)
export default router