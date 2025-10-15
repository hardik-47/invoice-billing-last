const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const InvoiceItem = sequelize.define('InvoiceItem', {
  description: DataTypes.STRING,      // was `item` before
  quantity: DataTypes.INTEGER,        // was `qty`
  unitPrice: DataTypes.FLOAT,         // was `price`
  total: DataTypes.FLOAT,
  invoiceId: DataTypes.INTEGER        // foreign key
});

module.exports = InvoiceItem;
