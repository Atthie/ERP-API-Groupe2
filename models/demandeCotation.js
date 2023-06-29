import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './users.js';

const DemandeCotation = sequelize.define('DemandeCotation', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateFin: {
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
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});


DemandeCotation.belongsTo(User, { foreignKey: 'userId' }); 

export default DemandeCotation;
