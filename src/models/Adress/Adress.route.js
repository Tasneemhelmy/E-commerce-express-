import { Router } from "express";
import * as adressController from './controller/Adress.controller.js'
import { authentication, authorization } from "../../middleware/auth.middelware.js";
import roles from "../../types/roles.js";
const router=Router()

router.post('/',authentication,authorization([roles.USER]),adressController.addAdress)
    .get('/',authentication,authorization([roles.USER]),adressController.getAdress)
    .put('/:id',authentication,authorization([roles.USER]),adressController.updateAdress)
    .delete('/:id',authentication,authorization([roles.USER]),adressController.deleteAdress)



export default router