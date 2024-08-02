import { Router } from "express";
import * as authController from './controller/auth.controller.js'
import userExisit from "../../middleware/auth.js";
import vaildateSchema from "../../middleware/vaildate.js";
import { signupSchema } from "../User/controller/UserSchema.js";

const router=Router()
router.post('/signUp',vaildateSchema(signupSchema),userExisit,authController.signUp)
    .post('/logIn',authController.logIn)
export default router