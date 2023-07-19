"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _passport = _interopRequireDefault(require("passport"));

var _RouteInscription = _interopRequireDefault(require("./routes/RouteInscription.js"));

var _RouteConnexion = _interopRequireDefault(require("./routes/RouteConnexion.js"));

var _RouteInvitationEM = _interopRequireDefault(require("./routes/RouteInvitationEM.js"));

var _RouteUser = _interopRequireDefault(require("./routes/RouteUser.js"));

var _RouteAjoutEntrepriseMiniere = _interopRequireDefault(require("./routes/RouteAjoutEntrepriseMiniere.js"));

var _RouteRecupEM = _interopRequireDefault(require("./routes/RouteRecupEM.js"));

var _RouteRecupUser = _interopRequireDefault(require("./routes/RouteRecupUser.js"));

var _RouteEditEM = _interopRequireDefault(require("./routes/RouteEditEM.js"));

var _RouteGetEMId = _interopRequireDefault(require("./routes/RouteGetEMId.js"));

var _entreprises = _interopRequireDefault(require("./models/entreprises.js"));

var _users = _interopRequireDefault(require("./models/users.js"));

var _RouteDeleteEM = _interopRequireDefault(require("./routes/RouteDeleteEM.js"));

var _RouteUserEM = _interopRequireDefault(require("./routes/RouteUserEM.js"));

var _RouteArticle = _interopRequireDefault(require("./routes/RouteArticle.js"));

var _RouteClient = _interopRequireDefault(require("./routes/RouteClient.js"));

var _RouteSearchArticle = _interopRequireDefault(require("./routes/RouteSearchArticle.js"));

var _article = _interopRequireDefault(require("./models/article.js"));

var _client = _interopRequireDefault(require("./models/client.js"));

var _RouteGetUserAttente = _interopRequireDefault(require("./routes/RouteGetUserAttente.js"));

var _RouteCountRole = _interopRequireDefault(require("./routes/RouteCountRole.js"));

var _RouteDemandeCotation = _interopRequireDefault(require("./routes/RouteDemandeCotation.js"));

var _demandeCotation = _interopRequireDefault(require("./models/demandeCotation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(_passport["default"].initialize());
app.use('/AjoutEM', _RouteAjoutEntrepriseMiniere["default"]);
app.use('/CountRole', _RouteCountRole["default"]);
app.use('/UserAttente', _RouteGetUserAttente["default"]);
app.use('/EditEM', _RouteEditEM["default"]);
app.use('/GetEM', _RouteRecupEM["default"]);
app.use('/GetUser', _RouteRecupUser["default"]);
app.use('/GetEMId', _RouteGetEMId["default"]);
app.use('/UserEM', _RouteUserEM["default"]);
app.use('/DeleteEM', _RouteDeleteEM["default"]);
app.use('/articles', _RouteArticle["default"]);
app.use('/clients', _RouteClient["default"]); //Cotation

app.use('/demandeCotations', _RouteDemandeCotation["default"]);
app.use('/inscription', _RouteInscription["default"]);
app.use('/inscriptionEM', _RouteInvitationEM["default"]);
app.use('/user', _RouteUser["default"]);
app.use('/connexion', _RouteConnexion["default"]);
app.use('/articles', _RouteSearchArticle["default"]);

function syncModels() {
  return regeneratorRuntime.async(function syncModels$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_users["default"].sync());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(_entreprises["default"].sync());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_article["default"].sync());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_client["default"].sync());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_demandeCotation["default"].sync());

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

;
app.listen(4000, function () {
  console.log("le serveur tourne sur le port 4000");
});