import express from 'express'
import userController from '../controllers/userController.js'
import validationDataUser  from "../middlewares/validationDataUser.js";
const router= express.Router();

router.post("", validationDataUser,userController)

export default router;