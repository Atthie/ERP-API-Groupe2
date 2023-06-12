"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchArticlesByCategory = exports.getArticleDetails = exports.sortArticles = exports.advancedSearch = exports.getSearchSuggestions = exports.searchArticles = void 0;

var _article = _interopRequireDefault(require("../models/article.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Recherche des articles par mots-clés.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles correspondants
 */
var searchArticles = function searchArticles(req, res) {
  var keywords, articles;
  return regeneratorRuntime.async(function searchArticles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          keywords = req.query.keywords;
          _context.next = 4;
          return regeneratorRuntime.awrap(_article["default"].findAll({
            where: {
              nom: _defineProperty({}, Op.like, "%".concat(keywords, "%"))
            }
          }));

        case 4:
          articles = _context.sent;
          res.status(200).json({
            articles: articles
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la recherche des articles.'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
/**
 * Obtenir des suggestions de recherche basées sur les mots-clés fournis.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste de suggestions de recherche
 */


exports.searchArticles = searchArticles;

var getSearchSuggestions = function getSearchSuggestions(req, res) {
  var keywords, suggestions;
  return regeneratorRuntime.async(function getSearchSuggestions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            keywords = req.query.keywords;
            suggestions = generateSearchSuggestions(keywords);
            res.status(200).json({
              suggestions: suggestions
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: 'Une erreur est survenue lors de l\'obtention des suggestions de recherche.'
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
 * Effectue une recherche avancée en utilisant des critères spécifiques.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles correspondants à la recherche avancée
 */


exports.getSearchSuggestions = getSearchSuggestions;

var advancedSearch = function advancedSearch(req, res) {
  var _req$query, keyword, priceRange, brand, rating, priceRangeValues, articles;

  return regeneratorRuntime.async(function advancedSearch$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, keyword = _req$query.keyword, priceRange = _req$query.priceRange, brand = _req$query.brand, rating = _req$query.rating;
          priceRangeValues = priceRange.split('-').map(parseFloat);
          _context3.next = 5;
          return regeneratorRuntime.awrap(_article["default"].findAll({
            where: {
              nom: _defineProperty({}, Op.like, "%".concat(keyword, "%")),
              prix: _defineProperty({}, Op.between, priceRangeValues),
              marque: brand,
              evaluation: _defineProperty({}, Op.gte, rating)
            }
          }));

        case 5:
          articles = _context3.sent;
          res.status(200).json({
            articles: articles
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la recherche avancée des articles.'
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
/**
 * Trie les articles en fonction du critère spécifié.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles triés
 */


exports.advancedSearch = advancedSearch;

var sortArticles = function sortArticles(req, res) {
  var sortBy, articles;
  return regeneratorRuntime.async(function sortArticles$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          sortBy = req.query.sortBy;
          _context4.t0 = sortBy;
          _context4.next = _context4.t0 === 'relevance' ? 5 : _context4.t0 === 'priceAsc' ? 9 : _context4.t0 === 'priceDesc' ? 13 : _context4.t0 === 'newest' ? 17 : 21;
          break;

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(_article["default"].findAll({
            order: [['relevance', 'DESC']]
          }));

        case 7:
          articles = _context4.sent;
          return _context4.abrupt("break", 24);

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(_article["default"].findAll({
            order: [['prix', 'ASC']]
          }));

        case 11:
          articles = _context4.sent;
          return _context4.abrupt("break", 24);

        case 13:
          _context4.next = 15;
          return regeneratorRuntime.awrap(_article["default"].findAll({
            order: [['prix', 'DESC']]
          }));

        case 15:
          articles = _context4.sent;
          return _context4.abrupt("break", 24);

        case 17:
          _context4.next = 19;
          return regeneratorRuntime.awrap(_article["default"].findAll({
            order: [['createdAt', 'DESC']]
          }));

        case 19:
          articles = _context4.sent;
          return _context4.abrupt("break", 24);

        case 21:
          _context4.next = 23;
          return regeneratorRuntime.awrap(_article["default"].findAll());

        case 23:
          articles = _context4.sent;

        case 24:
          res.status(200).json({
            articles: articles
          });
          _context4.next = 31;
          break;

        case 27:
          _context4.prev = 27;
          _context4.t1 = _context4["catch"](0);
          console.error(_context4.t1);
          res.status(500).json({
            message: 'Une erreur est survenue lors du tri des articles.'
          });

        case 31:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 27]]);
};
/**
 * Obtenir les détails d'un article spécifique.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Détails de l'article
 */


exports.sortArticles = sortArticles;

var getArticleDetails = function getArticleDetails(req, res) {
  var article;
  return regeneratorRuntime.async(function getArticleDetails$(_context5) {
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
          res.status(200).json({
            article: article
          });
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de l\'obtention des détails de l\'article.'
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
/**
 * Recherche des articles par catégorie.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des articles de la catégorie spécifiée
 */


exports.getArticleDetails = getArticleDetails;

var searchArticlesByCategory = function searchArticlesByCategory(req, res) {
  var category, articles;
  return regeneratorRuntime.async(function searchArticlesByCategory$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          category = req.query.category;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_article["default"].findAll({
            where: {
              categorie: category
            }
          }));

        case 4:
          articles = _context6.sent;
          res.status(200).json({
            articles: articles
          });
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la recherche des articles par catégorie.'
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.searchArticlesByCategory = searchArticlesByCategory;