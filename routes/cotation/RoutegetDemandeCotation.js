import express from "express";
import { getAllDemandeCotation } from "../../controllers/DemandeCotationController.js";

const router = express.Router();

router.get("", getAllDemandeCotation);

export default router;
