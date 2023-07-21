import express from "express";
import { editEntrepriseById } from "../controllers/entrepriseMiniereController.js";

const router = express.Router();
router.put('/:id', editEntrepriseById);

export default router;
