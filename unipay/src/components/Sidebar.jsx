import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  FaHome, 
  FaCalculator, 
  FaCog, 
  FaSignOutAlt,
  FaChartLine,
  FaWallet
} from 'react-icons/fa';
import '../css/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">UniPay</h1>
        <div className="user-info">
          <img 
            src={user?.picture || 'https://via.placeholder.com/50'} 
            alt="Profile" 
            className="user-avatar"
          />
          <div className="user-details">
            <span className="user-name">{user?.name || 'Usuario'}</span>
            <span className="user-email">{user?.email || 'usuario@ejemplo.com'}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link 
          to="/dashboard" 
          className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <FaHome className="nav-icon" />
          <span>Dashboard</span>
        </Link>

        <Link 
          to="/loan-calculator" 
          className={`nav-link ${isActive('/loan-calculator') ? 'active' : ''}`}
        >
          <FaCalculator className="nav-icon" />
          <span>Calculadora</span>
        </Link>

        <Link 
          to="/transactions" 
          className={`nav-link ${isActive('/transactions') ? 'active' : ''}`}
        >
          <FaChartLine className="nav-icon" />
          <span>Transacciones</span>
        </Link>

        <Link 
          to="/wallet" 
          className={`nav-link ${isActive('/wallet') ? 'active' : ''}`}
        >
          <FaWallet className="nav-icon" />
          <span>Billetera</span>
        </Link>

        <Link 
          to="/settings" 
          className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
        >
          <FaCog className="nav-icon" />
          <span>Configuración</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="nav-icon" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 