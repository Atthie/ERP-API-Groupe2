import express from 'express';
import {searchArticles, getSearchSuggestions, advancedSearch, sortArticles, getArticleDetails, searchArticlesByCategory } from '../controllers/articleSearchController.js';


const router = express.Router();

// Routes pour les différentes fonctionnalités des articles
router.get('/:action', async (req, res) => {
  try {
    const { action } = req.params;

    switch (action) {
      case 'search':
        await searchArticles(req, res);
        break;
      case 'search/suggestions':
        await getSearchSuggestions(req, res);
        break;
      case 'advanced-search':
        await advancedSearch(req, res);
        break;
      case 'sort':
        await sortArticles(req, res);
        break;
      case 'details':
        await getArticleDetails(req, res);
        break;
      case 'category':
        await searchArticlesByCategory(req, res);
        break;
      default:
        res.status(404).json({ message: 'Action non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors du traitement de la requête.' });
  }
});

export default router;