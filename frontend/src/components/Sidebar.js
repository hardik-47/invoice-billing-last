import { NavLink,useNavigate} from 'react-router-dom';
import '../styles/Sidebar.css';
import { useEffect, useState } from 'react';


const Sidebar = () => {
  const navigate= useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // update state
    navigate('/login');
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-logo">InvoiceApp</div>

      {!isLoggedIn ?
        <nav className="navbar-links">
          <NavLink to="/login" className="nav-item">Login</NavLink>
          <NavLink to="/register" className="nav-item">Sign up</NavLink>
        </nav> : <nav className="navbar-links">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/clients" className="nav-item">Clients</NavLink>
          <NavLink to="/invoices" className="nav-item">Invoices</NavLink>
          <NavLink onClick={handleLogout} className="nav-item">Logout</NavLink>
        </nav>

      }


    </header>
  );
};

export default Sidebar;
