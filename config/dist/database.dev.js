"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var db = new _sequelize.Sequelize("Erp", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres"
});
var _default = db;
exports["default"] = _default;