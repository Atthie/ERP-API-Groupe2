import express from 'express'
import  { userEM }  from '../controllers/userController.js'
import validationDataUser  from "../middlewares/validationDataUser.js";
const router= express.Router();

router.post("/:id", validationDataUser,userEM)

export default router;