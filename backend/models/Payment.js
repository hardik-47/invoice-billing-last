const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  amount: DataTypes.FLOAT,
  date: DataTypes.DATE,
  method: DataTypes.STRING, // e.g. 'Cash', 'Card', 'UPI'
  note: DataTypes.STRING
});

module.exports = Payment;
