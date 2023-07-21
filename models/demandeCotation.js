import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './users.js';

const DemandeCotationModel = sequelize.define('DemandeCotation', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  duree: {
    type: DataTypes.INTEGER,
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
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },
});

DemandeCotationModel.belongsTo(User, { foreignKey: 'userId' }); 

export default DemandeCotationModel;
