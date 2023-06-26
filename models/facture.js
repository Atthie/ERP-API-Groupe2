import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Facture extends Model {}

Facture.init(
  {
    entreprise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    articles: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    totalHT: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    taxes: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalTTC: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
  },
  {
    sequelize,
    modelName: 'Facture',
  }
);

export default Facture;
