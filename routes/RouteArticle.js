import express from "express";
import { createArticle, getArticles, getArticleById, updateArticlePut, updateArticlePatch, deleteArticle, getArticleCount, getArticlePhotoById } from "../controllers/articleController.js";

const router = express.Router();

// Créer un nouvel article
router.post("/", createArticle);

// Récupérer tous les articles
router.get("/", getArticles);

// Récupérer un article spécifique par son ID
router.get("/:id", getArticleById);

// Mettre à jour un article spécifique par son ID en utilisant le verbe PUT
router.put("/:id", updateArticlePut);

// Mettre à jour un article spécifique par son ID en utilisant le verbe PATCH
router.patch("/:id", updateArticlePatch);

// Supprimer un article spécifique par son ID
router.delete("/:id", deleteArticle);

// Récupérer la photo d'un article par son ID
router.get("/:id/uploads", getArticlePhotoById);

// Compter le nombre total d'articles
router.get("/articles/count", getArticleCount);

export default router;
