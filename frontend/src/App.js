// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Sidebar from './components/Sidebar';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import InvoiceDetails from './pages/InvoiceDetails';
import ClientState from './context/clientState';
import InvoiceState from './context/InvoiceState';


function App() {
  return (
    <InvoiceState>
    <ClientState>
    <Router>
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  </Router>
  </ClientState>
  </InvoiceState>
  );
}

export default App;