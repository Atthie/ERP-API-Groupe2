import express from "express";
import { getDemandeCotationById } from "../../controllers/DemandeCotationController.js";

const router = express.Router();

router.get("/:id", getDemandeCotationById);

export default router;
