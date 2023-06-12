"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articleController = require("../controllers/articleController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Créer un nouvel article


router.post("/", _articleController.createArticle); // Récupérer tous les articles

router.get("/", _articleController.getArticles); // Récupérer un article spécifique par son ID

router.get("/:id", _articleController.getArticleById); // Mettre à jour un article spécifique par son ID en utilisant le verbe PUT

router.put("/:id", _articleController.updateArticlePut); // Mettre à jour un article spécifique par son ID en utilisant le verbe PATCH

router.patch("/:id", _articleController.updateArticlePatch); // Supprimer un article spécifique par son ID

router["delete"]("/:id", _articleController.deleteArticle);
var _default = router; // import express from "express";
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

exports["default"] = _default;