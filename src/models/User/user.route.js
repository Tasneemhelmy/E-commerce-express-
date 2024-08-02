import { Router } from "express";
import * as userController from './controller/user.controller.js'
import { authentication } from "../../middleware/auth.middelware.js";
import vaildateSchema from "../../middleware/vaildate.js";
import { updatePassword } from "./controller/UserSchema.js";

const router=Router()
router.post('/changePass',vaildateSchema(updatePassword),authentication,userController.changePassword)
    .put('/',authentication,userController.updateAcc)
    .delete('/',authentication,userController.deleteAcc) 

export default router