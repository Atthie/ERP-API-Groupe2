'use strict';
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