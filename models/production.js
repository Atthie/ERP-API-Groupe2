import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './users.js';

const Production = sequelize.define('Production', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Produit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ressource: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Quantite: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Etat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Delai: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cout: {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

// Définition de la relation entre User et Client
User.hasMany(Production, { foreignKey: 'userId' });
Production.belongsTo(User, { foreignKey: 'userId' });

export default Production;
