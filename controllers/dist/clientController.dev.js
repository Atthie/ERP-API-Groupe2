"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.createClient = void 0;

var _expressValidator = require("express-validator");

var _users = _interopRequireDefault(require("../models/users.js"));

var _client = _interopRequireDefault(require("../models/client.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Crée un nouveau client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client créé
 */
var createClient = function createClient(req, res) {
  var _req$body, nom, email, entreprise, adresse, utilisateur, erreurs, nouveauClient;

  return regeneratorRuntime.async(function createClient$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nom = _req$body.nom, email = _req$body.email, entreprise = _req$body.entreprise, adresse = _req$body.adresse;
          utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

          erreurs = (0, _expressValidator.validationResult)(req);

          if (erreurs.isEmpty()) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            erreurs: erreurs.array()
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_client["default"].create({
            nom: nom,
            email: email,
            entreprise: entreprise,
            adresse: adresse,
            statut: '',
            userId: utilisateur.id // Lie le client à l'utilisateur actuel

          }));

        case 8:
          nouveauClient = _context.sent;
          res.status(201).json({
            client: nouveauClient
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la création du client.'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};
/**
 * Récupère tous les clients de l'utilisateur actuel.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des clients
 */


exports.createClient = createClient;

var getClients = function getClients(req, res) {
  var utilisateur, clients;
  return regeneratorRuntime.async(function getClients$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

          _context2.next = 4;
          return regeneratorRuntime.awrap(_client["default"].findAll({
            where: {
              userId: utilisateur.id
            }
          }));

        case 4:
          clients = _context2.sent;
          res.status(200).json({
            clients: clients
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des clients.'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
/**
 * Récupère un client par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client récupéré
 */


exports.getClients = getClients;

var getClientById = function getClientById(req, res) {
  var utilisateur, idClient, client;
  return regeneratorRuntime.async(function getClientById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

          idClient = req.params.id;
          _context3.next = 5;
          return regeneratorRuntime.awrap(_client["default"].findOne({
            where: {
              id: idClient,
              userId: utilisateur.id
            }
          }));

        case 5:
          client = _context3.sent;

          if (client) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Client non trouvé.'
          }));

        case 8:
          res.status(200).json({
            client: client
          });
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération du client.'
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};
/**
 * Met à jour les informations d'un client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client mis à jour
 */


exports.getClientById = getClientById;

var updateClient = function updateClient(req, res) {
  var _req$body2, nom, email, entreprise, adresse, statut, utilisateur, idClient, erreurs, client;

  return regeneratorRuntime.async(function updateClient$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, nom = _req$body2.nom, email = _req$body2.email, entreprise = _req$body2.entreprise, adresse = _req$body2.adresse, statut = _req$body2.statut;
          utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

          idClient = req.params.id;
          erreurs = (0, _expressValidator.validationResult)(req);

          if (erreurs.isEmpty()) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            erreurs: erreurs.array()
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(_client["default"].findOne({
            where: {
              id: idClient,
              userId: utilisateur.id
            }
          }));

        case 9:
          client = _context4.sent;

          if (client) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Client non trouvé.'
          }));

        case 12:
          _context4.next = 14;
          return regeneratorRuntime.awrap(client.update({
            nom: nom || client.nom,
            email: email || client.email,
            entreprise: entreprise || client.entreprise,
            adresse: adresse || client.adresse,
            statut: statut || client.statut
          }));

        case 14:
          res.status(200).json({
            client: client
          });
          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour du client.'
          });

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
};
/**
 * Supprime un client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Confirmation de suppression
 */


exports.updateClient = updateClient;

var deleteClient = function deleteClient(req, res) {
  var utilisateur, idClient, client;
  return regeneratorRuntime.async(function deleteClient$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

          idClient = req.params.id;
          _context5.next = 5;
          return regeneratorRuntime.awrap(_client["default"].findOne({
            where: {
              id: idClient,
              userId: utilisateur.id
            }
          }));

        case 5:
          client = _context5.sent;

          if (client) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Client non trouvé.'
          }));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(client.destroy());

        case 10:
          res.status(200).json({
            message: 'Client supprimé avec succès.'
          });
          _context5.next = 17;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression du client.'
          });

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.deleteClient = deleteClient;