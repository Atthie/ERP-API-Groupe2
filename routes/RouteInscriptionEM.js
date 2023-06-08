import express from "express";
import { inscriptionEMController } from "../controllers/entrepriseMiniereController.js";

const router = express.Router();

router.post("", inscriptionEMController);

export default router;
