import express from "express";
import { DemandeCotationController } from "../../controllers/DemandeCotationController.js";

const router = express.Router();

router.post("", DemandeCotationController);

export default router;
