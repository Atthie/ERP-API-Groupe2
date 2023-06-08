import express from "express";
import { inscriptionEMController } from "../controllers/entrepriseVendeurController.js";

const router = express.Router();

router.post("", inscriptionController);

export default router;
