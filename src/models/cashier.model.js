const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/connection-db');

class Cashier extends Model {}

Cashier.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('active', 'nonactive'),
    defaultValue: 'active'
  },
  image_profile: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize, // Pass the sequelize instance
  modelName: 'Cashier',
  tableName: 'Cashier',
  timestamps: false,
  paranoid: true
});

module.exports = Cashier;
