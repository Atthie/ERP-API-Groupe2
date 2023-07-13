import express from "express";
import { createProduction, getProductions, getProductionById, updateProduction, deleteProduction} from "../controllers/productionController.js";

const router = express.Router();

// Créer un nouvel article
router.post("/", createProduction);

// Récupérer tous les articles
router.get("/", getProductions);

// Récupérer un article spécifique par son ID
router.get("/:id", getProductionById);

// Mettre à jour un article spécifique par son ID en utilisant le verbe PUT
router.put("/:id", updateProduction);

// Supprimer un article spécifique par son ID
router.delete("/:id", deleteProduction);


export default router;
