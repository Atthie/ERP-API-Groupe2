'use strict';
import { DataTypes } from 'sequelize';
import  sequelize from '../config/database.js'; // Assurez-vous que le chemin vers votre configuration Sequelize est correct

const Entreprise = sequelize.define('Entreprise', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etat: {
    type: DataTypes.STRING,
    allowNull: false,
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

export default Entreprise
