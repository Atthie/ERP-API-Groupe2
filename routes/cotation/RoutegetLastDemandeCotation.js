import express from "express";
import { getLastCreatedElement } from "../../controllers/DemandeCotationController.js";

const router = express.Router();

router.get("/:id", getLastCreatedElement);

export default router;
