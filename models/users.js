import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Entreprise from './entreprises.js'; 

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idEntreprise: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


export default User;
