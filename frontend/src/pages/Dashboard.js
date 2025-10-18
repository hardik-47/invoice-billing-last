import React, { useContext, useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import clientsContext from '../context/clientContext';
import invoiceContext from '../context/invoiceContext';

function Dashboard() {
  const { clientsList } = useContext(clientsContext);
  const { invoiceList } = useContext(invoiceContext);

  const [pending, setPending] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentInvoices, setRecentInvoices] = useState([]);

  useEffect(() => {
    if (invoiceList && invoiceList.length > 0) {
      // Count pending invoices
      const pendingCount = invoiceList.filter(invoice => invoice.status === 'Pending').length;
      setPending(pendingCount);

      // Calculate total revenue (from Paid invoices)
      const revenue = invoiceList
        .filter(invoice => invoice.status === 'Paid')
        .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
      setTotalRevenue(revenue);

      // Get latest 5 invoices
      const recent = [...invoiceList]
        .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
        .slice(0, 5);
      setRecentInvoices(recent);
    }
  }, [invoiceList]);

  if (!clientsList || !invoiceList) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-container">
        <div className="stat-card">Total Clients<br /><strong>{clientsList.length}</strong></div>
        <div className="stat-card">Total Invoices<br /><strong>{invoiceList.length}</strong></div>
        <div className="stat-card">Total Revenue<br /><strong>₹{totalRevenue.toLocaleString()}</strong></div>
        <div className="stat-card">Pending Payments<br /><strong>{pending}</strong></div>
      </div>

      <h3>Recent Invoices</h3>
      <table className="recent-invoices">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.Client?.name || 'Unknown'}</td>
              <td>₹{invoice.total}</td>
              <td className={invoice.status === 'Paid' ? 'paid' : 'unpaid'}>{invoice.status}</td>
              <td>{new Date(invoice.issueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
