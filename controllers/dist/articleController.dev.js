"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticleCount = exports.deleteArticle = exports.updateArticlePatch = exports.updateArticlePut = exports.getArticlePhotoById = exports.getArticleById = exports.getArticles = exports.createArticle = void 0;

var _expressValidator = require("express-validator");

var _article = _interopRequireDefault(require("../models/article.js"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  var allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier doit être une image (JPEG, PNG).'), false);
  }
};

var limits = {
  fileSize: 1024 * 1024 * 5
};
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
                      photo = req.file ? req.file.path : null;
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
                        quantite: quantite,
                        photo: photo
                      }));

                    case 13:
                      nouvelArticle = _context.sent;
                      res.status(201).json({
                        article: nouvelArticle,
                        photo: photo
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
  var articles, count;
  return regeneratorRuntime.async(function getArticles$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_article["default"].findAll());

        case 3:
          articles = _context3.sent;
          count = articles.length;
          res.status(200).json({
            articles: articles,
            count: count
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des articles.'
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
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
 * Récupère la photo d'un article par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Photo de l'article
 */


exports.getArticleById = getArticleById;

var getArticlePhotoById = function getArticlePhotoById(req, res) {
  var article, cachedPhoto, compressedPhoto;
  return regeneratorRuntime.async(function getArticlePhotoById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

        case 3:
          article = _context5.sent;

          if (article) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Article non trouvé.'
          }));

        case 6:
          if (article.photo) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'La photo de l\'article n\'existe pas.'
          }));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(cacheService.get(article.photo));

        case 10:
          cachedPhoto = _context5.sent;

          if (!cachedPhoto) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return", res.sendFile(cachedPhoto));

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(imageCompressionService.compress(article.photo));

        case 15:
          compressedPhoto = _context5.sent;
          _context5.next = 18;
          return regeneratorRuntime.awrap(cacheService.set(article.photo, compressedPhoto));

        case 18:
          // Envoi de la photo compressée au client
          res.sendFile(compressedPhoto);
          _context5.next = 25;
          break;

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération de la photo de l\'article.'
          });

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 21]]);
};
/**
 * Met à jour un article (via HTTP PUT).
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Article mis à jour
 */


exports.getArticlePhotoById = getArticlePhotoById;

var updateArticlePut = function updateArticlePut(req, res) {
  var _req$body2, nom, description, prix, quantite, errors, updatedFields;

  return regeneratorRuntime.async(function updateArticlePut$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body2 = req.body, nom = _req$body2.nom, description = _req$body2.description, prix = _req$body2.prix, quantite = _req$body2.quantite;
          errors = (0, _expressValidator.validationResult)(req);

          if (errors.isEmpty()) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          updatedFields = {
            nom: nom,
            description: description,
            prix: prix,
            quantite: quantite
          };
          upload.single('photo')(req, res, function handleUploadError(err) {
            var article;
            return regeneratorRuntime.async(function handleUploadError$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(err instanceof _multer["default"].MulterError)) {
                      _context6.next = 4;
                      break;
                    }

                    return _context6.abrupt("return", res.status(400).json({
                      message: 'Erreur lors du téléchargement du fichier.',
                      error: err.message
                    }));

                  case 4:
                    if (!err) {
                      _context6.next = 6;
                      break;
                    }

                    return _context6.abrupt("return", res.status(500).json({
                      message: 'Une erreur est survenue lors de la mise à jour de l\'article.',
                      error: err.message
                    }));

                  case 6:
                    if (req.file) {
                      updatedFields.photo = req.file.path;
                    }

                    _context6.next = 9;
                    return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

                  case 9:
                    article = _context6.sent;

                    if (article) {
                      _context6.next = 12;
                      break;
                    }

                    return _context6.abrupt("return", res.status(404).json({
                      message: 'Article non trouvé.'
                    }));

                  case 12:
                    _context6.next = 14;
                    return regeneratorRuntime.awrap(article.update(updatedFields));

                  case 14:
                    res.status(200).json({
                      article: article,
                      photo: req.file ? req.file.path : null
                    });

                  case 15:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });
          _context7.next = 13;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour de l\'article.'
          });

        case 13:
        case "end":
          return _context7.stop();
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

  return regeneratorRuntime.async(function updateArticlePatch$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body3 = req.body, nom = _req$body3.nom, description = _req$body3.description, prix = _req$body3.prix, quantite = _req$body3.quantite;
          errors = (0, _expressValidator.validationResult)(req);

          if (errors.isEmpty()) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          updatedFields = {
            nom: nom,
            description: description,
            prix: prix,
            quantite: quantite
          };
          upload.single('photo')(req, res, function handleUploadError(err) {
            var article;
            return regeneratorRuntime.async(function handleUploadError$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    if (!(err instanceof _multer["default"].MulterError)) {
                      _context8.next = 4;
                      break;
                    }

                    return _context8.abrupt("return", res.status(400).json({
                      message: 'Erreur lors du téléchargement du fichier.',
                      error: err.message
                    }));

                  case 4:
                    if (!err) {
                      _context8.next = 6;
                      break;
                    }

                    return _context8.abrupt("return", res.status(500).json({
                      message: 'Une erreur est survenue lors de la mise à jour de l\'article.',
                      error: err.message
                    }));

                  case 6:
                    if (req.file) {
                      updatedFields.photo = req.file.path;
                    }

                    _context8.next = 9;
                    return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

                  case 9:
                    article = _context8.sent;

                    if (article) {
                      _context8.next = 12;
                      break;
                    }

                    return _context8.abrupt("return", res.status(404).json({
                      message: 'Article non trouvé.'
                    }));

                  case 12:
                    _context8.next = 14;
                    return regeneratorRuntime.awrap(article.update(updatedFields));

                  case 14:
                    res.status(200).json({
                      article: article,
                      photo: req.file ? req.file.path : null
                    });

                  case 15:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          });
          _context9.next = 13;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour de l\'article.'
          });

        case 13:
        case "end":
          return _context9.stop();
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
  return regeneratorRuntime.async(function deleteArticle$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(_article["default"].findByPk(req.params.id));

        case 3:
          article = _context10.sent;

          if (article) {
            _context10.next = 6;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            message: 'Article non trouvé.'
          }));

        case 6:
          _context10.next = 8;
          return regeneratorRuntime.awrap(article.destroy());

        case 8:
          res.status(200).json({
            message: 'Article supprimé avec succès.'
          });
          _context10.next = 15;
          break;

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression de l\'article.'
          });

        case 15:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 11]]);
};
/**
 * Récupère le nombre total d'articles dans la base de données.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Nombre total d'articles
 */


exports.deleteArticle = deleteArticle;

var getArticleCount = function getArticleCount(req, res) {
  var count;
  return regeneratorRuntime.async(function getArticleCount$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(_article["default"].count());

        case 3:
          count = _context11.sent;
          res.status(200).json({
            count: count
          });
          _context11.next = 11;
          break;

        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors du comptage des articles.'
          });

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getArticleCount = getArticleCount;