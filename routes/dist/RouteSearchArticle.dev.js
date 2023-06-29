"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articleSearchController = require("../controllers/articleSearchController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Routes pour les différentes fonctionnalités des articles


router.get('/:action', function _callee(req, res) {
  var action;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          action = req.params.action;
          _context.t0 = action;
          _context.next = _context.t0 === 'search' ? 5 : _context.t0 === 'search/suggestions' ? 8 : _context.t0 === 'advanced-search' ? 11 : _context.t0 === 'sort' ? 14 : _context.t0 === 'details' ? 17 : _context.t0 === 'category' ? 20 : 23;
          break;

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _articleSearchController.searchArticles)(req, res));

        case 7:
          return _context.abrupt("break", 24);

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap((0, _articleSearchController.getSearchSuggestions)(req, res));

        case 10:
          return _context.abrupt("break", 24);

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap((0, _articleSearchController.advancedSearch)(req, res));

        case 13:
          return _context.abrupt("break", 24);

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap((0, _articleSearchController.sortArticles)(req, res));

        case 16:
          return _context.abrupt("break", 24);

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap((0, _articleSearchController.getArticleDetails)(req, res));

        case 19:
          return _context.abrupt("break", 24);

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap((0, _articleSearchController.searchArticlesByCategory)(req, res));

        case 22:
          return _context.abrupt("break", 24);

        case 23:
          res.status(404).json({
            message: 'Action non trouvée.'
          });

        case 24:
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1);
          res.status(500).json({
            message: 'Une erreur est survenue lors du traitement de la requête.'
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
});
var _default = router;
exports["default"] = _default;