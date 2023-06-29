'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Article from './article.js';
import DemandeCotation from './demandeCotation.js';


class ArticleCotation extends Model {}
ArticleCotation.init(
  {
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dmId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: DemandeCotation,
        key: 'id',
      },
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Article,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'ArticleCotation',
  }
);
ArticleCotation.belongsTo(DemandeCotation, { foreignKey: 'dmId' });

ArticleCotation.belongsTo(Article, { foreignKey: 'articleId' });


export default ArticleCotation;
