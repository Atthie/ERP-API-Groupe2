const Article = require('../models/articleModel');

// Middleware pour le téléchargement de fichier
const multer = require('multer');
const path = require('path');

// Définir le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Spécifiez le répertoire de destination des images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Spécifiez le nom du fichier
  }
});

// Configuration de l'upload de fichier avec le stockage défini
const upload = multer({ storage: storage });

// Méthode de création d'un article
exports.createArticle = async (req, res) => {
  try {
    const { nom, description, quantite, date, userId } = req.body;

    // Vérifiez si un fichier a été téléchargé
    let photo = null;
    if (req.file) {
      photo = req.file.filename;
    }

    // Créez un nouvel article dans la base de données
    const article = await Article.create({
      nom,
      description,
      quantite,
      photo,
      date,
      userId
    });

    res.status(201).json({ message: 'Article ajouté avec succès', article });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de l\'article', error });
  }
};

// Exportez le middleware d'upload de fichier
exports.upload = upload;
