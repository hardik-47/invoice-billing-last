// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Invoice = sequelize.define('Invoice', {
//   invoiceNumber: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   date: DataTypes.DATE,
//   dueDate: DataTypes.DATE,
//   total: DataTypes.FLOAT,
//   status: {
//     type: DataTypes.ENUM('Pending', 'Paid', 'Overdue'),
//     defaultValue: 'Pending'
//   }
// });

// module.exports = Invoice;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Invoice = sequelize.define('Invoice', {
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  issueDate: DataTypes.DATE, // add this
  dueDate: DataTypes.DATE,
  total: DataTypes.FLOAT,
  status: {
    type: DataTypes.ENUM('Pending', 'Paid', 'Overdue'),
    defaultValue: 'Pending'
  },
  userId: DataTypes.INTEGER,  // add this (foreign key to User)
  clientId: DataTypes.INTEGER // add this (foreign key to Client)
});

// Invoice.beforeCreate(async (invoice, options) => {
//   // Count how many invoices already exist
//   const count = await Invoice.count();
//   const newNumber = count + 1;

//   // Format: INV-0001, INV-0002, etc.
//   invoice.invoiceNumber = `INV-${String(newNumber).padStart(4, '0')}`;
// });


module.exports = Invoice;



