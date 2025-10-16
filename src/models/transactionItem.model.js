const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TransactionItem = sequelize.define('TransactionItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: DataTypes.STRING,
    transaction_id: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subtotal_item: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    tableName: 'Transaction_item',
    timestamps: false,
    paranoid: true
  });

  return TransactionItem;
};
