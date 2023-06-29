import express from "express";
import { getAllEntreprisesMinieres } from "../controllers/entrepriseMiniereController.js";

const router = express.Router();

router.get('',getAllEntreprisesMinieres);


export default router;
