import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

function Navbar({ walletConnected, connectWallet, disconnectWallet, publicKey, darkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const location = useLocation();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      message: 'Pago próximo a vencer',
      date: '2024-04-25'
    },
    {
      id: 2,
      type: 'scholarship',
      message: 'Nueva beca disponible',
      unread: true
    }
  ]);
  const [currentLang, setCurrentLang] = useState('es');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const notificationsRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowWalletMenu(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="navbar-brand">
          <Link to="/">
            <span className="logo-text">UniPay</span>
          </Link>
        </div>

        <div className="navbar-menu">
          {walletConnected && (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              
              <div className="nav-dropdown">
                <button 
                  className="nav-link dropdown-trigger"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Servicios <span className="dropdown-arrow">▼</span>
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/scholarship" className="dropdown-item">
                      <span className="icon">🎓</span>
                      Becas
                    </Link>
                    <Link to="/request-loan" className="dropdown-item">
                      <span className="icon">💰</span>
                      Préstamos
                    </Link>
                    <Link to="/pay-loan" className="dropdown-item">
                      <span className="icon">💳</span>
                      Pagos
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/transactions" 
                className={`nav-link ${location.pathname === '/transactions' ? 'active' : ''}`}
              >
                Transacciones
              </Link>

              <div className="notifications-dropdown" ref={notificationsRef}>
                <button 
                  className="nav-link notification-trigger"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <span className="icon">🔔</span>
                  {notifications.some(n => n.unread) && (
                    <span className="notification-badge" />
                  )}
                </button>
                {showNotifications && (
                  <div className="notifications-menu">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                        <span className="notification-icon">
                          {notification.type === 'payment' ? '💳' : '🎓'}
                        </span>
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          {notification.date && (
                            <span className="notification-date">{notification.date}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="wallet-dropdown">
                <button 
                  className={`connect-wallet-btn ${walletConnected ? 'connected' : ''}`}
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                >
                  <div className="wallet-info">
                    <span className="wallet-status">●</span>
                    <span className="wallet-address">{formatWalletAddress(publicKey)}</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                </button>
                {showWalletMenu && (
                  <div className="wallet-menu">
                    <div className="wallet-menu-header">
                      <span className="wallet-label">Wallet Conectada</span>
                      <span className="wallet-full-address">{publicKey}</span>
                    </div>
                    <div className="wallet-menu-actions">
                      <button 
                        className="wallet-action copy" 
                        onClick={() => navigator.clipboard.writeText(publicKey)}
                      >
                        <span className="icon">📋</span>
                        Copiar Dirección
                      </button>
                      <button 
                        className="wallet-action disconnect" 
                        onClick={handleDisconnect}
                      >
                        <span className="icon">🔌</span>
                        Desconectar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="language-dropdown" ref={languageRef}>
                <button 
                  className="nav-link"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  {languages.find(l => l.code === currentLang).flag}
                </button>
                {showLanguageMenu && (
                  <div className="language-menu">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        className={`language-option ${currentLang === lang.code ? 'active' : ''}`}
                        onClick={() => setCurrentLang(lang.code)}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {!walletConnected && (
            <button 
              className="connect-wallet-btn"
              onClick={connectWallet}
            >
              Conectar Wallet
            </button>
          )}
          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 