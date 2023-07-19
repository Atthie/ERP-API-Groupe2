import express from "express";
import { Production, ReqProduction } from "../controllers/productionController.js";
import {validationProduction} from "../middlewares/validationProduction.js"
// import multer from "../middlewares/multer";

const router = express.Router()

router.get("/",Production)
// router.post("/enregistrer",ReqProduction)

router.post("/enregistrer" , ReqProduction);

export default router