import express from "express";
import { inscriptionController } from "../controllers/entrepriseController.js";

const router = express.Router();

router.post("", inscriptionController);

export default router;
