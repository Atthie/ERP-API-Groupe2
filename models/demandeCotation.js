import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Entreprise from './entreprises.js'; 

const DemandeCotation = sequelize.define('User', {
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  etat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateFin: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
 entrepriseId:{
  type :DataTypes.INTEGER ,
  references :{
    model :Entreprise ,
    key:'id'
    },
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

DemandeCotation.belongsTo(Entreprise, { foreignKey: 'id' });
export default DemandeCotation;
