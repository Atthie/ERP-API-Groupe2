import express from "express";
import { publierDemandeCotation } from "../../controllers/DemandeCotationController.js";

const router = express.Router();

router.put("/:id", publierDemandeCotation);

export default router;
