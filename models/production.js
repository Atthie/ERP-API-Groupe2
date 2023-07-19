import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../config/database.js';
import User from './users.js';

const PlanProductions = sequelize.define('PlanProductions', {
 
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ressource: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // quantite: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  etat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  delai: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cout: {
    type: DataTypes.STRING,
    allowNull: false
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


export default PlanProductions;
