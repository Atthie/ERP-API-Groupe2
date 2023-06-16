import { validationResult } from 'express-validator';
import Article from '../models/article.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier doit être une image (JPEG, PNG).'), false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5
};

const upload = multer({ storage, fileFilter, limits });

/**
 * Crée un nouvel article.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article créé
 */
export const createArticle = async (req, res) => {
  try {
    upload.single('photo')(req, res, async function handleUploadError(err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'article.', error: err.message });
      }

      const { nom, description, prix, quantite } = req.body;
      let photo = req.file ? req.file.path : null;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const nouvelArticle = await Article.create({
        nom,
        description,
        quantite,
        photo
      });

      res.status(201).json({ article: nouvelArticle, photo });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'article.' });
  }
};

/**
 * Récupère tous les articles.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles
 */
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des articles.' });
  }
};

/**
 * Récupère un article par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article récupéré
 */
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    res.status(200).json({ article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'article.' });
  }
};

/**
 * Récupère la photo d'un article par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Photo de l'article
 */
export const getArticlePhotoById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    if (!article.photo) {
      return res.status(404).json({ message: 'La photo de l\'article n\'existe pas.' });
    }

    // Implémentation de la mise en cache des photos
    const cachedPhoto = await cacheService.get(article.photo);
    if (cachedPhoto) {
      return res.sendFile(cachedPhoto);
    }

    // Implémentation de la compression des images
    const compressedPhoto = await imageCompressionService.compress(article.photo);
    
    // Implémentation de la mise en cache des photos (stockage en cache)
    await cacheService.set(article.photo, compressedPhoto);

    // Envoi de la photo compressée au client
    res.sendFile(compressedPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la photo de l\'article.' });
  }
};



/**
 * Met à jour un article (via HTTP PUT).
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article mis à jour
 */
export const updateArticlePut = async (req, res) => {
  try {
    const { nom, description, prix, quantite } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedFields = {
      nom,
      description,
      prix,
      quantite
    };

    upload.single('photo')(req, res, async function handleUploadError(err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'article.', error: err.message });
      }

      if (req.file) {
        updatedFields.photo = req.file.path; 
      }

      const article = await Article.findByPk(req.params.id);

      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé.' });
      }

      await article.update(updatedFields);

      res.status(200).json({ article, photo: req.file ? req.file.path : null });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'article.' });
  }
};

/**
 * Met à jour un article (via HTTP PATCH).
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article mis à jour
 */
export const updateArticlePatch = async (req, res) => {
  try {
    const { nom, description, prix, quantite } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedFields = {
      nom,
      description,
      prix,
      quantite
    };

    upload.single('photo')(req, res, async function handleUploadError(err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'article.', error: err.message });
      }

      if (req.file) {
        updatedFields.photo = req.file.path;
      }

      const article = await Article.findByPk(req.params.id);

      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé.' });
      }

      await article.update(updatedFields);

      res.status(200).json({ article, photo: req.file ? req.file.path : null });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'article.' });
  }
};

/**
 * Supprime un article.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Message de suppression réussie
 */
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    await article.destroy();

    res.status(200).json({ message: 'Article supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'article.' });
  }
};