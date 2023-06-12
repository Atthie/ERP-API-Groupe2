import { validationResult } from 'express-validator';
import Article from '../models/article.js';
import multer from 'multer';

// Configuration de multer pour gérer les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Spécifie le dossier de destination des fichiers
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // Spécifie le nom du fichier
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Vérification du type de fichier
const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier doit être une image (JPEG, PNG).'), false);
  }
};

// Limite de taille du fichier
const limits = {
  fileSize: 1024 * 1024 * 5 // 5 Mo (en octets)
};

// Crée une instance de multer avec les options de configuration
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
    // Utilisation de multer pour gérer le fichier téléchargé
    upload.single('photo')(req, res, async function handleUploadError(err) {
      if (err instanceof multer.MulterError) {
        // Une erreur s'est produite lors du téléchargement du fichier
        return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err.message });
      } else if (err) {
        // Une erreur s'est produite pour une autre raison
        return res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'article.', error: err.message });
      }

      const { nom, description, prix, quantite } = req.body;
      let photo = req.file ? req.file.path : null;

      // Valider les données entrantes
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const nouvelArticle = await Article.create({
        nom,
        description,
        prix,
        quantite,
        photo
      });

      res.status(201).json({ article: nouvelArticle });
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
 * Met à jour un article (via HTTP PUT).
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article mis à jour
 */
export const updateArticlePut = async (req, res) => {
  try {
    const { nom, description, prix, quantite } = req.body;

    // Valider les données entrantes
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

    // Utilisation de multer pour gérer le fichier téléchargé
    upload.single('photo')(req, res, async function handleUploadError(err) {
      if (err instanceof multer.MulterError) {
        // Une erreur s'est produite lors du téléchargement du fichier
        return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err.message });
      } else if (err) {
        // Une erreur s'est produite pour une autre raison
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

      res.status(200).json({ article });
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

    // Valider les données entrantes
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

    // Utilisation de multer pour gérer le fichier téléchargé
    upload.single('photo')(req, res, async function handleUploadError(err) {
      if (err instanceof multer.MulterError) {
        // Une erreur s'est produite lors du téléchargement du fichier
        return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err.message });
      } else if (err) {
        // Une erreur s'est produite pour une autre raison
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

      res.status(200).json({ article });
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