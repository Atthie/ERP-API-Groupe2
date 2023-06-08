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
  idEntreprise: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Entreprise,
      key: 'id',
    },
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

User.associate = () => {
  User.belongsTo(Entreprise, { foreignKey: 'idEntreprise' });
};

export default User;
