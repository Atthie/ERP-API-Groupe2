"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database.js"));

var _users = _interopRequireDefault(require("./users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Client = _database["default"].define('Client', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  entreprise: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  adresse: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  statut: {
    type: _sequelize.DataTypes.STRING,
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
}); // Définition de la relation entre User et Client


_users["default"].hasMany(Client, {
  foreignKey: 'userId'
});

Client.belongsTo(_users["default"], {
  foreignKey: 'userId'
});
var _default = Client;
exports["default"] = _default;