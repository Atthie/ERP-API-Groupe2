import Article from '../models/article.js'
import multer from 'multer';
import path from 'path';


export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des articles.' });
  }
};
