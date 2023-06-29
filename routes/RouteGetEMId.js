import express from "express";
import {getEntrepriseById} from "../controllers/entrepriseMiniereController.js";

const router = express.Router();
router.get('/:id', getEntrepriseById);

export default router;
