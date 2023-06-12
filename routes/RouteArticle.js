import express from "express";
import { createArticle, getArticles, getArticleById, updateArticlePut, updateArticlePatch, deleteArticle } from "../controllers/articleController.js";

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

export default router;









































// import express from "express";
// import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from "../controllers/articleController.js";

// module.exports  = (app) => {
//     const router = require('express').Router()
// // Créer un nouvel article
// app.post("/articles", createArticle);

// // Récupérer tous les articles
// app.get("/articles", getArticles);

// // Récupérer un article spécifique par son ID
// app.get("/articles/:id", getArticleById);

// //Mettre à jour un article spécifique par son ID
// app.put("/articles/:id", updateArticle);

// // Supprimer un article spécifique par son ID
// app.delete("/articles/:id", deleteArticle);
// }