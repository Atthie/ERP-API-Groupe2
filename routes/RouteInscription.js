import express from "express";
import { inscriptionController } from "../controllers/entrepriseVendeurController.js";

const router = express.Router();

router.post("", inscriptionController);

export default router;
