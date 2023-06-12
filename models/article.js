'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Article extends Model {}

Article.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Article',
  }
);

export default Article;
