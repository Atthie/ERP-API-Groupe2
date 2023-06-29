import Article from '../models/article.js';

/**
 * Recherche des articles par mots-clés.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles correspondants
 */
export const searchArticles = async (req, res) => {
  try {
    const { keywords } = req.query;

    const articles = await Article.findAll({
      where: {
        nom: {
          [Op.like]: `%${keywords}%`
        }
      }
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la recherche des articles.' });
  }
};

/**
 * Obtenir des suggestions de recherche basées sur les mots-clés fournis.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste de suggestions de recherche
 */
export const getSearchSuggestions = async (req, res) => {
  try {
    const { keywords } = req.query;

    const suggestions = generateSearchSuggestions(keywords);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'obtention des suggestions de recherche.' });
  }
};

/**
 * Effectue une recherche avancée en utilisant des critères spécifiques.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles correspondants à la recherche avancée
 */
export const advancedSearch = async (req, res) => {
  try {
    const { keyword, priceRange, brand, rating } = req.query;

    const priceRangeValues = priceRange.split('-').map(parseFloat);

    const articles = await Article.findAll({
      where: {
        nom: {
          [Op.like]: `%${keyword}%`
        },
        prix: {
          [Op.between]: priceRangeValues
        },
        marque: brand,
        evaluation: {
          [Op.gte]: rating
        }
      }
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la recherche avancée des articles.' });
  }
};

/**
 * Trie les articles en fonction du critère spécifié.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles triés
 */
export const sortArticles = async (req, res) => {
  try {
    const { sortBy } = req.query;

    let articles;

    switch (sortBy) {
      case 'relevance':
        articles = await Article.findAll({ order: [['relevance', 'DESC']] });
        break;
      case 'priceAsc':
        articles = await Article.findAll({ order: [['prix', 'ASC']] });
        break;
      case 'priceDesc':
        articles = await Article.findAll({ order: [['prix', 'DESC']] });
        break;
      case 'newest':
        articles = await Article.findAll({ order: [['createdAt', 'DESC']] });
        break;
      default:
        articles = await Article.findAll();
    }

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors du tri des articles.' });
  }
};

/**
 * Obtenir les détails d'un article spécifique.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Détails de l'article
 */
export const getArticleDetails = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    res.status(200).json({ article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'obtention des détails de l\'article.' });
  }
};

/**
 * Recherche des articles par catégorie.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles de la catégorie spécifiée
 */
export const searchArticlesByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const articles = await Article.findAll({
      where: {
        categorie: category
      }
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la recherche des articles par catégorie.' });
  }
};
