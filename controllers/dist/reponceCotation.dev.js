"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelFacture = exports.deleteFacture = exports.updateFacture = exports.getFactureById = exports.getFactures = exports.createFacture = void 0;

var _expressValidator = require("express-validator");

var _facture = _interopRequireDefault(require("../models/facture.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Crée une facture en réponse à une demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Facture créée
 */
var createFacture = function createFacture(req, res) {
  var _req$body, entreprise, description, articles, errors, totalHT, taxes, totalTTC, nouvelleFacture;

  return regeneratorRuntime.async(function createFacture$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, entreprise = _req$body.entreprise, description = _req$body.description, articles = _req$body.articles;
          errors = (0, _expressValidator.validationResult)(req);

          if (errors.isEmpty()) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          totalHT = articles.reduce(function (total, article) {
            return total + article.quantite * article.prixUnitaire;
          }, 0);
          taxes = totalHT * 0.2;
          totalTTC = totalHT + taxes;
          _context.next = 10;
          return regeneratorRuntime.awrap(_facture["default"].create({
            entreprise: entreprise,
            description: description,
            articles: articles,
            totalHT: totalHT,
            taxes: taxes,
            totalTTC: totalTTC,
            date: new Date()
          }));

        case 10:
          nouvelleFacture = _context.sent;
          res.status(201).json({
            facture: nouvelleFacture
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la création de la facture.'
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};
/**
 * Récupère toutes les factures.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des factures
 */


exports.createFacture = createFacture;

var getFactures = function getFactures(req, res) {
  var factures;
  return regeneratorRuntime.async(function getFactures$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_facture["default"].findAll());

        case 3:
          factures = _context2.sent;
          res.status(200).json({
            factures: factures
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des factures.'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/**
 * Récupère une facture par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Facture par ID
 */


exports.getFactures = getFactures;

var getFactureById = function getFactureById(req, res) {
  var id, facture;
  return regeneratorRuntime.async(function getFactureById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_facture["default"].findByPk(id));

        case 4:
          facture = _context3.sent;

          if (facture) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Facture non trouvée.'
          }));

        case 7:
          res.status(200).json({
            facture: facture
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération de la facture.'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/**
 * Met à jour une facture.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Facture mise à jour
 */


exports.getFactureById = getFactureById;

var updateFacture = function updateFacture(req, res) {
  var id, _req$body2, entreprise, description, articles, errors, facture, totalHT, taxes, totalTTC;

  return regeneratorRuntime.async(function updateFacture$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, entreprise = _req$body2.entreprise, description = _req$body2.description, articles = _req$body2.articles;
          errors = (0, _expressValidator.validationResult)(req);

          if (errors.isEmpty()) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(_facture["default"].findByPk(id));

        case 8:
          facture = _context4.sent;

          if (facture) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Facture non trouvée.'
          }));

        case 11:
          totalHT = articles.reduce(function (total, article) {
            return total + article.quantite * article.prixUnitaire;
          }, 0);
          taxes = totalHT * 0.2;
          totalTTC = totalHT + taxes;
          facture.entreprise = entreprise;
          facture.description = description;
          facture.articles = articles;
          facture.totalHT = totalHT;
          facture.taxes = taxes;
          facture.totalTTC = totalTTC;
          facture.updatedAt = new Date();
          _context4.next = 23;
          return regeneratorRuntime.awrap(facture.save());

        case 23:
          res.status(200).json({
            facture: facture
          });
          _context4.next = 30;
          break;

        case 26:
          _context4.prev = 26;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour de la facture.'
          });

        case 30:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 26]]);
};
/**
 * Supprime une facture.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Message de succès
 */


exports.updateFacture = updateFacture;

var deleteFacture = function deleteFacture(req, res) {
  var id, facture;
  return regeneratorRuntime.async(function deleteFacture$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_facture["default"].findByPk(id));

        case 4:
          facture = _context5.sent;

          if (facture) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Facture non trouvée.'
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(facture.destroy());

        case 9:
          res.status(200).json({
            message: 'Facture supprimée avec succès.'
          });
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression de la facture.'
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
};
/**
 * Annule une facture dans les 20 minutes suivant son envoi.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Message de succès
 */


exports.deleteFacture = deleteFacture;

var cancelFacture = function cancelFacture(req, res) {
  var id, facture, currentTime, timeDifference;
  return regeneratorRuntime.async(function cancelFacture$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_facture["default"].findByPk(id));

        case 4:
          facture = _context6.sent;

          if (facture) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'Facture non trouvée.'
          }));

        case 7:
          currentTime = new Date();
          timeDifference = currentTime - facture.date;

          if (!(timeDifference > 20 * 60 * 1000)) {
            _context6.next = 11;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            message: 'La période d\'annulation de la facture est écoulée.'
          }));

        case 11:
          _context6.next = 13;
          return regeneratorRuntime.awrap(facture.destroy());

        case 13:
          res.status(200).json({
            message: 'Facture annulée avec succès.'
          });
          _context6.next = 20;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de l\'annulation de la facture.'
          });

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.cancelFacture = cancelFacture;