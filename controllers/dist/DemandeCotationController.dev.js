"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDemandeCotation = exports.updateDemandeCotation = exports.getDemandeCotationById = exports.getAllDemandeCotation = exports.createDemandeCotation = void 0;

var _expressValidator = require("express-validator");

var _demandeCotation = _interopRequireDefault(require("../models/demandeCotation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Crée une nouvelle demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Demande de cotation créée
 */
var createDemandeCotation = function createDemandeCotation(req, res) {
  var _req$body, nom, etat, description, duree, dateFin, erreurs, nouvelleDemandeCotation;

  return regeneratorRuntime.async(function createDemandeCotation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nom = _req$body.nom, etat = _req$body.etat, description = _req$body.description, duree = _req$body.duree, dateFin = _req$body.dateFin;
          erreurs = (0, _expressValidator.validationResult)(req);

          if (erreurs.isEmpty()) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            erreurs: erreurs.array()
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_demandeCotation["default"].create({
            nom: nom,
            etat: etat,
            description: description,
            duree: duree,
            dateFin: dateFin
          }));

        case 7:
          nouvelleDemandeCotation = _context.sent;
          res.status(201).json({
            demandeCotation: nouvelleDemandeCotation
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la création de la demande de cotation.'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};
/**
 * Récupère toutes les demandes de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des demandes de cotation
 */


exports.createDemandeCotation = createDemandeCotation;

var getAllDemandeCotation = function getAllDemandeCotation(req, res) {
  var demandeCotations, nombreTotalDemandesCotation;
  return regeneratorRuntime.async(function getAllDemandeCotation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_demandeCotation["default"].findAll());

        case 3:
          demandeCotations = _context2.sent;
          nombreTotalDemandesCotation = demandeCotations.length;
          res.status(200).json({
            demandeCotations: demandeCotations,
            nombreTotalDemandesCotation: nombreTotalDemandesCotation
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des demandes de cotation.'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
/**
 * Récupère une demande de cotation par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Demande de cotation récupérée
 */


exports.getAllDemandeCotation = getAllDemandeCotation;

var getDemandeCotationById = function getDemandeCotationById(req, res) {
  var idDemandeCotation, demandeCotation;
  return regeneratorRuntime.async(function getDemandeCotationById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          idDemandeCotation = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_demandeCotation["default"].findOne({
            where: {
              id: idDemandeCotation
            }
          }));

        case 4:
          demandeCotation = _context3.sent;

          if (demandeCotation) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Demande de cotation non trouvée.'
          }));

        case 7:
          res.status(200).json({
            demandeCotation: demandeCotation
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération de la demande de cotation.'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/**
 * Met à jour les informations d'une demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Demande de cotation mise à jour
 */


exports.getDemandeCotationById = getDemandeCotationById;

var updateDemandeCotation = function updateDemandeCotation(req, res) {
  var _req$body2, nom, etat, description, duree, dateFin, idDemandeCotation, erreurs, demandeCotation;

  return regeneratorRuntime.async(function updateDemandeCotation$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, nom = _req$body2.nom, etat = _req$body2.etat, description = _req$body2.description, duree = _req$body2.duree, dateFin = _req$body2.dateFin;
          idDemandeCotation = req.params.id;
          erreurs = (0, _expressValidator.validationResult)(req);

          if (erreurs.isEmpty()) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            erreurs: erreurs.array()
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(_demandeCotation["default"].findOne({
            where: {
              id: idDemandeCotation
            }
          }));

        case 8:
          demandeCotation = _context4.sent;

          if (demandeCotation) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Demande de cotation non trouvée.'
          }));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(demandeCotation.update({
            nom: nom || demandeCotation.nom,
            etat: etat || demandeCotation.etat,
            description: description || demandeCotation.description,
            duree: duree || demandeCotation.duree,
            dateFin: dateFin || demandeCotation.dateFin
          }));

        case 13:
          res.status(200).json({
            demandeCotation: demandeCotation
          });
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour de la demande de cotation.'
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
/**
 * Supprime une demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Confirmation de suppression
 */


exports.updateDemandeCotation = updateDemandeCotation;

var deleteDemandeCotation = function deleteDemandeCotation(req, res) {
  var idDemandeCotation, demandeCotation;
  return regeneratorRuntime.async(function deleteDemandeCotation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          idDemandeCotation = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_demandeCotation["default"].findOne({
            where: {
              id: idDemandeCotation
            }
          }));

        case 4:
          demandeCotation = _context5.sent;

          if (demandeCotation) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Demande de cotation non trouvée.'
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(demandeCotation.destroy());

        case 9:
          res.status(200).json({
            message: 'Demande de cotation supprimée avec succès.'
          });
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression de la demande de cotation.'
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.deleteDemandeCotation = deleteDemandeCotation;