"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _clientController = require("../controllers/clientController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Créer un nouveau client


router.post('/', _clientController.createClient); // Récupérer tous les clients de l'utilisateur actuel

router.get('/', _clientController.getClients); // Récupérer un client par son ID

router.get('/:id', _clientController.getClientById); // Mettre à jour les informations d'un client

router.put('/:id', _clientController.updateClient); // Supprimer un client

router["delete"]('/:id', _clientController.deleteClient);
var _default = router;
exports["default"] = _default;