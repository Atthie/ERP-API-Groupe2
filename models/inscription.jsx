const { DataTypes } = require('sequelize');
const {sequelize}  = require('../conf/database');

const Users = sequelize.define('User', {
    id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true,allowNull:false},
    nom:{type: DataTypes.STRING,allowNull:false},
    description:{type: DataTypes.STRING,allowNull:false},
    email:{type: DataTypes.STRING,allowNull:false},
});

module.exports = Users;
