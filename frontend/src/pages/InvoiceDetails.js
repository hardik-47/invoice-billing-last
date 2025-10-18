import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    // Replace with actual API later
    
    const getpart=async ()=>{

      try {
        const res = await axios.get(`http://localhost:5000/api/invoices/${id}`,{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })

        setInvoice(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('get particular invoice failed:', error.response?.data || error.message);
      }

    } 

    getpart();

  }, []);

  const generatePDF = () => {
    const element = document.getElementById('invoice');
    html2pdf().from(element).save(`invoice-${id}.pdf`);
  };

  if (!invoice) return <p>Loading...</p>;

  const total = invoice.InvoiceItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="invoice-details">
      <div id="invoice" style={{ padding: '20px', border: '1px solid #ccc' }}>
        <h2>Invoice #{invoice.id}</h2>
        <p><strong>Client:</strong> {invoice.Client.name}</p>
        <p><strong>Email:</strong> {invoice.Client.email}</p>
        <p><strong>Date:</strong> {invoice.dueDate}</p>

        <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.InvoiceItems.map((item, idx) => (
              <tr key={idx}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>₹{item.unitPrice}</td>
                <td>₹{item.quantity * item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ textAlign: 'right', marginTop: '20px' }}>Total: ₹{total}</h3>
      </div>

      <button onClick={generatePDF} className="btn btn-primary mt-3">Download PDF</button>
    </div>
  );
}

export default InvoiceDetails;
