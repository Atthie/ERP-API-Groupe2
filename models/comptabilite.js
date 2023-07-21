import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../config/database.js';


const comptabilite = sequelize.define('comptabilite', {
 
  montant: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  transaction: {
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

export default comptabilite;
