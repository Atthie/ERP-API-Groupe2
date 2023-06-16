'use strict';
<<<<<<< HEAD
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
=======
import Model from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Entreprises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entreprises.init({
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entreprises',
  });
  return Entreprises;
};
>>>>>>> 97ac8ebdb9a79185b39178b093d8f8a560c60897
