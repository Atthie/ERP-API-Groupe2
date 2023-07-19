"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _DemandeCotationController = require("../controllers/DemandeCotationController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Créer une nouvelle demande de cotation


router.post('/', _DemandeCotationController.createDemandeCotation); // Récupérer toutes les demandes de cotation

router.get('/', _DemandeCotationController.getAllDemandeCotation); // Récupérer la demande de cotation par id

router.get('/', _DemandeCotationController.getDemandeCotationById); // Mettre à jour une demande de cotation

router.put('/:id', _DemandeCotationController.updateDemandeCotation); // Supprimer une demande de cotation

router["delete"]('/:id', _DemandeCotationController.deleteDemandeCotation);
var _default = router;
exports["default"] = _default;