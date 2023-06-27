// Importez le modèle Article
const { Article } = require('../models');
// Importez la bibliothèque multer pour gérer les téléchargements de fichiers
const multer = require('multer');

// Configurez le stockage des fichiers avec multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Définissez le répertoire de destination des fichiers
    cb(null, 'chemin/vers/votre/repertoire');
  },
  filename: function (req, file, cb) {
    // Générez un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Utilisez le nom de fichier d'origine avec un suffixe unique
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

// Initialisez multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Définissez la fonction du contrôleur pour l'ajout d'un article
const createArticle = async (req, res) => {
  try {
    // Récupérez les données de la requête
    const { nom, description, quantite, statut, date, userId } = req.body;

    // Vérifiez si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).json({ message: 'Veuillez télécharger une photo.' });
    }

    // Récupérez le chemin du fichier téléchargé
    const photo = req.file.path;

    // Créez l'article dans la base de données
    const article = await Article.create({
      nom,
      description,
      quantite,
      photo,
      statut,
      date,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    });

    // Répondez avec l'article créé
    res.status(201).json({ article });
  } catch (error) {
    // Gérez les erreurs
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'article.' });
  }
};

// Exportez la fonction du contrôleur
module.exports = {
  createArticle,
  upload.single('photo') // Middleware pour le téléchargement de fichier
};
