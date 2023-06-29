import express from "express";
const router = express.Router();
const articlesController = require('../controllers/articlesController');

router.post('/articles', articlesController.upload.single('photo'), articlesController.createArticle);

module.exports = router;
