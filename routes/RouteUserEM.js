import express from 'express'
import userEM from '../controllers/userEM.js'
import validationDataUser  from "../middlewares/validationDataUser.js";
const router= express.Router();

router.post("", validationDataUser,userEM)

export default router;