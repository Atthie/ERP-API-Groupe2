"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteArticle = exports.updateArticlePatch = exports.updateArticlePut = exports.getArticleById = exports.getArticles = exports.createArticle = void 0;

var _expressValidator = require("express-validator");

var _article = _interopRequireDefault(require("../models/article.js"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Configuration de multer pour gérer les fichiers
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    // Spécifie le dossier de destination des fichiers
    cb(null, './uploads');
  },
  filename: function filename(req, file, cb) {
    // Spécifie le nom du fichier
    cb(null, Date.now() + '-' + file.originalname);
  }
}); // Vérification du type de fichier


var fileFilter = function fileFilter(req, file, cb) {
  var allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier doit être une image (JPEG, PNG).'), false);
  }
}; // Limite de taille du fichier


var limits = {
  fileSize: 1024 * 1024 * 5 // 5 Mo (en octets)

}; // Crée une instance de multer avec les options de configuration

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});
/**
 * Crée un nouvel article.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article créé
 */

var createArticle = function createArticle(req, res) {
  return regeneratorRuntime.async(function createArticle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            // Utilisation de multer pour gérer le fichier téléchargé
            upload.single('photo')(req, res, function handleUploadError(err) {
              var _req$body, nom, description, prix, quantite, photo, errors, nouvelArticle;

              return regeneratorRuntime.async(function handleUploadError$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(err instanceof _multer["default"].MulterError)) {
                        _context.next = 4;
                        break;
                      }

                      return _context.abrupt("return", res.status(400).json({
                        message: 'Erreur lors du téléchargement du fichier.',
                        error: err.message
                      }));

                    case 4:
                      if (!err) {
                        _context.next = 6;
                        break;
                      }

                      return _context.abrupt("return", res.status(500).json({
                        message: 'Une erreur est survenue lors de la création de l\'article.',
                        error: err.message
                      }));

                    case 6:
                      _req$body = req.body, nom = _req$body.nom, description = _req$body.description, prix = _req$body.prix, quantite = _req$body.quantite;
                      photo = req.file ? req.file.path : null; // Valider les données entrantes

                      errors = (0, _expressValidator.validationResult)(req);

                      if (errors.isEmpty()) {
                        _context.next = 11;
                        break;
                      }

                      return _context.abrupt("return", res.status(400).json({
                        errors: errors.array()
                      }));

                    case 11:
                      _context.next = 13;
                      return regeneratorRuntime.awrap(_article["default"].create({
                        nom: nom,
                        description: description,
                        prix: prix,
                        quantite: quantite,
                        photo: photo
                      }));

                    case 13:
                      nouvelArticle = _context.sent;
                      res.status(201).json({
                        article: nouvelArticle
                      });

                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: 'Une erreur est survenue lors de la création de l\'article.'
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/**
 * Récupère tous les articles.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles
 */


exports.createArticle = createArticle;

var getArticles = function getArticles(req, res) {
  var articles;
  return regeneratorRuntime.async(function getArticles$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_article["default"].findAll());

        case 3:
          articles = _context3.sent;
          res.status(200).json({
            articles: articles
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des articles.'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/**
 * Récupère un article par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article récupéré
 */


exports.getArticles = getArticles;

var getArticleById = function getArticleById(req, res) {
  var article;
  return regeneratorRuntime.async(function getArticleById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

        case 3:
          article = _context4.sent;

          if (article) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Article non trouvé.'
          }));

        case 6:
          res.status(200).json({
            article: article
          });
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération de l\'article.'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
/**
 * Met à jour un article (via HTTP PUT).
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article mis à jour
 */


exports.getArticleById = getArticleById;

var updateArticlePut = function updateArticlePut(req, res) {
  var _req$body2, nom, description, prix, quantite, errors, updatedFields;

  return regeneratorRuntime.async(function updateArticlePut$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body2 = req.body, nom = _req$body2.nom, description = _req$body2.description, prix = _req$body2.prix, quantite = _req$body2.quantite; // Valider les données entrantes

          errors = (0, _expressValidator.validationResult)(req);

          if (errors.isEmpty()) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          updatedFields = {
            nom: nom,
            description: description,
            prix: prix,
            quantite: quantite
          }; // Utilisation de multer pour gérer le fichier téléchargé

          upload.single('photo')(req, res, function handleUploadError(err) {
            var article;
            return regeneratorRuntime.async(function handleUploadError$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!(err instanceof _multer["default"].MulterError)) {
                      _context5.next = 4;
                      break;
                    }

                    return _context5.abrupt("return", res.status(400).json({
                      message: 'Erreur lors du téléchargement du fichier.',
                      error: err.message
                    }));

                  case 4:
                    if (!err) {
                      _context5.next = 6;
                      break;
                    }

                    return _context5.abrupt("return", res.status(500).json({
                      message: 'Une erreur est survenue lors de la mise à jour de l\'article.',
                      error: err.message
                    }));

                  case 6:
                    if (req.file) {
                      updatedFields.photo = req.file.path;
                    }

                    _context5.next = 9;
                    return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

                  case 9:
                    article = _context5.sent;

                    if (article) {
                      _context5.next = 12;
                      break;
                    }

                    return _context5.abrupt("return", res.status(404).json({
                      message: 'Article non trouvé.'
                    }));

                  case 12:
                    _context5.next = 14;
                    return regeneratorRuntime.awrap(article.update(updatedFields));

                  case 14:
                    res.status(200).json({
                      article: article
                    });

                  case 15:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour de l\'article.'
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
/**
 * Met à jour un article (via HTTP PATCH).
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article mis à jour
 */


exports.updateArticlePut = updateArticlePut;

var updateArticlePatch = function updateArticlePatch(req, res) {
  var _req$body3, nom, description, prix, quantite, errors, updatedFields;

  return regeneratorRuntime.async(function updateArticlePatch$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body3 = req.body, nom = _req$body3.nom, description = _req$body3.description, prix = _req$body3.prix, quantite = _req$body3.quantite; // Valider les données entrantes

          errors = (0, _expressValidator.validationResult)(req);

          if (errors.isEmpty()) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          updatedFields = {
            nom: nom,
            description: description,
            prix: prix,
            quantite: quantite
          }; // Utilisation de multer pour gérer le fichier téléchargé

          upload.single('photo')(req, res, function handleUploadError(err) {
            var article;
            return regeneratorRuntime.async(function handleUploadError$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!(err instanceof _multer["default"].MulterError)) {
                      _context7.next = 4;
                      break;
                    }

                    return _context7.abrupt("return", res.status(400).json({
                      message: 'Erreur lors du téléchargement du fichier.',
                      error: err.message
                    }));

                  case 4:
                    if (!err) {
                      _context7.next = 6;
                      break;
                    }

                    return _context7.abrupt("return", res.status(500).json({
                      message: 'Une erreur est survenue lors de la mise à jour de l\'article.',
                      error: err.message
                    }));

                  case 6:
                    if (req.file) {
                      updatedFields.photo = req.file.path;
                    }

                    _context7.next = 9;
                    return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

                  case 9:
                    article = _context7.sent;

                    if (article) {
                      _context7.next = 12;
                      break;
                    }

                    return _context7.abrupt("return", res.status(404).json({
                      message: 'Article non trouvé.'
                    }));

                  case 12:
                    _context7.next = 14;
                    return regeneratorRuntime.awrap(article.update(updatedFields));

                  case 14:
                    res.status(200).json({
                      article: article
                    });

                  case 15:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });
          _context8.next = 13;
          break;

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour de l\'article.'
          });

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
/**
 * Supprime un article.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Message de suppression réussie
 */


exports.updateArticlePatch = updateArticlePatch;

var deleteArticle = function deleteArticle(req, res) {
  var article;
  return regeneratorRuntime.async(function deleteArticle$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

        case 3:
          article = _context9.sent;

          if (article) {
            _context9.next = 6;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            message: 'Article non trouvé.'
          }));

        case 6:
          _context9.next = 8;
          return regeneratorRuntime.awrap(article.destroy());

        case 8:
          res.status(200).json({
            message: 'Article supprimé avec succès.'
          });
          _context9.next = 15;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression de l\'article.'
          });

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.deleteArticle = deleteArticle;