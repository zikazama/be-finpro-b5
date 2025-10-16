const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: DataTypes.STRING,
    order_type: DataTypes.ENUM('dinein', 'takeaway'),
    customer_name: DataTypes.STRING,
    table_number: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    order_number: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    tableName: 'Transaction',
    timestamps: false,
    paranoid: true
  });

  return Transaction;
};
