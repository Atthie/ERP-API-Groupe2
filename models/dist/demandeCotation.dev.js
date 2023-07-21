"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database.js"));

var _users = _interopRequireDefault(require("./users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DemandeCotationModel = _database["default"].define('DemandeCotation', {
  nom: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  etat: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  dateFin: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  duree: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: _users["default"],
      key: 'id'
    }
  }
});

DemandeCotationModel.belongsTo(_users["default"], {
  foreignKey: 'userId'
});
var _default = DemandeCotationModel;
exports["default"] = _default;