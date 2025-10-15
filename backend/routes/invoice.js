const express = require('express');
const router = express.Router();
const { Invoice, InvoiceItem, Client } = require('../models');
const authenticate = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');
const generateInvoicePDF = require('../utils/generateInvoicePDF')


// Get all invoices
router.get('/', authenticate, async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      where: { userId: req.userId },
      include: [Client, InvoiceItem]
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get single invoice
router.get('/:id', authenticate, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      where: { id: req.params.id, userId: req.userId },
      include: [Client, InvoiceItem]
    });
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create invoice
router.post('/', authenticate, async (req, res) => {
  try {
    console.log(req.body);
    const { clientId, dueDate, items } = req.body;

    // Step 1: Calculate total for each item and for the whole invoice
    let invoiceTotal = 0;

    const itemData = items.map(item => {
      const total = item.quantity * item.unitPrice;
      invoiceTotal += total;
      return {
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: total
      };
    });

    // Step 2: Create invoice
    const num= uuidv4();

    const invoice = await Invoice.create({
      invoiceNumber: num,
      clientId,
      userId: req.userId,
      issueDate: new Date(),
      dueDate,
      total: invoiceTotal,       // total added here
      status: 'Pending'
    });

    // Step 3: Create invoice items with invoiceId
    const itemPromises = itemData.map(item =>
      InvoiceItem.create({ ...item, invoiceId: invoice.id })
    );

    await Promise.all(itemPromises);

    // Step 4: Return full populated invoice
    const populatedInvoice = await Invoice.findByPk(invoice.id, {
      include: [Client, InvoiceItem]
    });

    res.status(201).json(populatedInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create invoice' });
  }
});


// Update invoice
router.put('/:id', authenticate, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });

    const { clientId, dueDate, status } = req.body;
    await invoice.update({ clientId, dueDate, status });

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update invoice' });
  }
});

// Delete invoice and items
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });

    await InvoiceItem.destroy({ where: { invoiceId: invoice.id } });
    await invoice.destroy();

    res.json({ msg: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete invoice' });
  }
});

//PDF Download for ivoice
router.get('/:id/pdf', authenticate, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      where: { id: req.params.id, userId: req.userId },
      include: [Client, InvoiceItem]
    });

    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=invoice-${invoice.id}.pdf`);

    generateInvoicePDF(invoice, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error generating PDF' });
  }
});


module.exports = router;
