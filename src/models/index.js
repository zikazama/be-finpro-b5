const cashierModel = require('./cashier.model');
const { sequelize } = require('../configs/connection-db');

// Define associations if needed
// You can add other models here as needed
// const adminModel = require('./admin.model');
// const productModel = require('./product.model');
// etc.

module.exports = {
  cashierModel,
  // Add other models here too
  sequelize,
};