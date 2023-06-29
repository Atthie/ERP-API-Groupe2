import express from "express";
import {modifierEtatEntreprise} from "../controllers/entrepriseMiniereController.js";

const router = express.Router();
router.put('/:id',modifierEtatEntreprise);
export default router;
