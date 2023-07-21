import express from "express";
import { deleteDemandeCotation } from "../../controllers/DemandeCotationController.js";

const router = express.Router();

router.delete("/:id", deleteDemandeCotation);

export default router;