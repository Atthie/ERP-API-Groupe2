"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.createClient = void 0;

var _expressValidator = require("express-validator");

var _client = _interopRequireDefault(require("../models/client.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { validationResult } from 'express-validator';
// import User from '../models/users.js';
// import Client from '../models/client.js';
// /**
//  * Crée un nouveau client.
//  *
//  * @param {Object} req - Requête HTTP
//  * @param {Object} res - Réponse HTTP
//  * @returns {Object} - Client créé
//  */
// export const createClient = async (req, res) => {
//   try {
//     const { nom, email, entreprise, adresse } = req.body;
//     const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
//     const erreurs = validationResult(req);
//     if (!erreurs.isEmpty()) {
//       return res.status(400).json({ erreurs: erreurs.array() });
//     }
//     const nouveauClient = await Client.create({
//       nom,
//       email,
//       entreprise,
//       adresse,
//       statut: '',
//       userId: utilisateur.id // Lie le client à l'utilisateur actuel
//     });
//     res.status(201).json({ client: nouveauClient });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur est survenue lors de la création du client.' });
//   }
// };
// /**
//  * Récupère tous les clients de l'utilisateur actuel.
//  *
//  * @param {Object} req - Requête HTTP
//  * @param {Object} res - Réponse HTTP
//  * @returns {Object} - Liste des clients
//  */
// export const getClients = async (req, res) => {
//   try {
//     const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
//     const clients = await Client.findAll({ where: { userId: utilisateur.id } });
//     const nombreTotalClients = clients.length;
//     res.status(200).json({ clients, nombreTotalClients });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des clients.' });
//   }
// };
// /**
//  * Récupère un client par son ID.
//  *
//  * @param {Object} req - Requête HTTP
//  * @param {Object} res - Réponse HTTP
//  * @returns {Object} - Client récupéré
//  */
// export const getClientById = async (req, res) => {
//   try {
//     const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
//     const idClient = req.params.id;
//     const client = await Client.findOne({ where: { id: idClient, userId: utilisateur.id } });
//     if (!client) {
//       return res.status(404).json({ message: 'Client non trouvé.' });
//     }
//     res.status(200).json({ client });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du client.' });
//   }
// };
// /**
//  * Met à jour les informations d'un client.
//  *
//  * @param {Object} req - Requête HTTP
//  * @param {Object} res - Réponse HTTP
//  * @returns {Object} - Client mis à jour
//  */
// export const updateClient = async (req, res) => {
//   try {
//     const { nom, email, entreprise, adresse, statut } = req.body;
//     const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
//     const idClient = req.params.id;
//     const erreurs = validationResult(req);
//     if (!erreurs.isEmpty()) {
//       return res.status(400).json({ erreurs: erreurs.array() });
//     }
//     const client = await Client.findOne({ where: { id: idClient, userId: utilisateur.id } });
//     if (!client) {
//       return res.status(404).json({ message: 'Client non trouvé.' });
//     }
//     await client.update({
//       nom: nom || client.nom,
//       email: email || client.email,
//       entreprise: entreprise || client.entreprise,
//       adresse: adresse || client.adresse,
//       statut: statut || client.statut
//     });
//     res.status(200).json({ client });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du client.' });
//   }
// };
// /**
//  * Supprime un client.
//  *
//  * @param {Object} req - Requête HTTP
//  * @param {Object} res - Réponse HTTP
//  * @returns {Object} - Confirmation de suppression
//  */
// export const deleteClient = async (req, res) => {
//   try {
//     const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
//     const idClient = req.params.id;
//     const client = await Client.findOne({ where: { id: idClient, userId: utilisateur.id } });
//     if (!client) {
//       return res.status(404).json({ message: 'Client non trouvé.' });
//     }
//     await client.destroy();
//     res.status(200).json({ message: 'Client supprimé avec succès.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du client.' });
//   }
// };

/**
 * Crée un nouveau client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client créé
 */
var createClient = function createClient(req, res) {
  var _req$body, nom, email, entreprise, adresse, erreurs, nouveauClient;

  return regeneratorRuntime.async(function createClient$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nom = _req$body.nom, email = _req$body.email, entreprise = _req$body.entreprise, adresse = _req$body.adresse;
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
          return regeneratorRuntime.awrap(_client["default"].create({
            nom: nom,
            email: email,
            entreprise: entreprise,
            adresse: adresse,
            statut: ''
          }));

        case 7:
          nouveauClient = _context.sent;
          res.status(201).json({
            client: nouveauClient
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la création du client.'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};
/**
 * Récupère tous les clients.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des clients
 */


exports.createClient = createClient;

var getClients = function getClients(req, res) {
  var clients, nombreTotalClients;
  return regeneratorRuntime.async(function getClients$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_client["default"].findAll());

        case 3:
          clients = _context2.sent;
          nombreTotalClients = clients.length;
          res.status(200).json({
            clients: clients,
            nombreTotalClients: nombreTotalClients
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
  var idClient, client;
  return regeneratorRuntime.async(function getClientById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          idClient = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_client["default"].findOne({
            where: {
              id: idClient
            }
          }));

        case 4:
          client = _context3.sent;

          if (client) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Client non trouvé.'
          }));

        case 7:
          res.status(200).json({
            client: client
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération du client.'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
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
  var _req$body2, nom, email, entreprise, adresse, statut, idClient, erreurs, client;

  return regeneratorRuntime.async(function updateClient$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, nom = _req$body2.nom, email = _req$body2.email, entreprise = _req$body2.entreprise, adresse = _req$body2.adresse, statut = _req$body2.statut;
          idClient = req.params.id;
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
          return regeneratorRuntime.awrap(_client["default"].findOne({
            where: {
              id: idClient
            }
          }));

        case 8:
          client = _context4.sent;

          if (client) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Client non trouvé.'
          }));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(client.update({
            nom: nom || client.nom,
            email: email || client.email,
            entreprise: entreprise || client.entreprise,
            adresse: adresse || client.adresse,
            statut: statut || client.statut
          }));

        case 13:
          res.status(200).json({
            client: client
          });
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour du client.'
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
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
  var idClient, client;
  return regeneratorRuntime.async(function deleteClient$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          idClient = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_client["default"].findOne({
            where: {
              id: idClient
            }
          }));

        case 4:
          client = _context5.sent;

          if (client) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Client non trouvé.'
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(client.destroy());

        case 9:
          res.status(200).json({
            message: 'Client supprimé avec succès.'
          });
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression du client.'
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.deleteClient = deleteClient;