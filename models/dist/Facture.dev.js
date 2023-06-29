'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database.js"));

var _cotation = _interopRequireDefault(require("./cotation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Facture =
/*#__PURE__*/
function (_Model) {
  _inherits(Facture, _Model);

  function Facture() {
    _classCallCheck(this, Facture);

    return _possibleConstructorReturn(this, _getPrototypeOf(Facture).apply(this, arguments));
  }

  return Facture;
}(_sequelize.Model);

Facture.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cotation: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: _cotation["default"],
      key: 'id'
    }
  },
  entreprise: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  montant: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: false
  },
  photo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize: _database["default"],
  modelName: 'Facture'
});
Facture.belongsTo(_cotation["default"], {
  foreignKey: 'cotation'
});
var _default = Facture;
exports["default"] = _default;