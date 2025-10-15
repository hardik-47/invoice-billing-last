const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe PDF to response
  doc.pipe(res);

  // Invoice Header
  doc.fontSize(20).text('INVOICE', { align: 'center' });

  doc.moveDown();
  doc.fontSize(12).text(`Invoice Number: ${invoice.id}`);
  doc.text(`Issue Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
  doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);
  doc.text(`Status: ${invoice.status}`);
  doc.moveDown();

  doc.text(`Bill To:`);
  doc.text(`${invoice.Client?.name}`);
  doc.text(`${invoice.Client?.email}`);
  doc.moveDown();

  doc.text('Items:', { underline: true });

  invoice.InvoiceItems.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.item} - Qty: ${item.qty} x ₹${item.price} = ₹${item.total}`
    );
  });

  doc.moveDown();
  doc.fontSize(14).text(`Total: ₹${invoice.total}`, { align: 'right' });

  doc.end();
};

module.exports = generateInvoicePDF;
