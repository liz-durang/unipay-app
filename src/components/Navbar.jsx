import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ walletConnected, connectWallet }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">UniPay</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/scholarship">Becas</Link>
        <Link to="/request-loan">Solicitar Préstamo</Link>
        <Link to="/pay-loan">Pagar Préstamo</Link>
        <button 
          className={`connect-wallet-btn ${walletConnected ? 'connected' : ''}`}
          onClick={connectWallet}
        >
          {walletConnected ? 'Wallet Conectada ✅' : 'Conectar Wallet'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 