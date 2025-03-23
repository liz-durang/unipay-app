import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { isConnected, getPublicKey } from '@stellar/freighter-api';
import './App.css';

// Componentes de páginas
const Home = () => (
  <div className="home-container">
    <h1>UniPay - Préstamos Universitarios en Stellar</h1>
    <div className="features-grid">
      <div className="feature-card">
        <h3>Becas</h3>
        <p>Recibe apoyo financiero para tus estudios</p>
        <Link to="/scholarship" className="cta-button">Solicitar Beca</Link>
      </div>
      <div className="feature-card">
        <h3>Préstamos</h3>
        <p>Financiamiento flexible para tu educación</p>
        <Link to="/loan" className="cta-button">Solicitar Préstamo</Link>
      </div>
      <div className="feature-card">
        <h3>Pagos</h3>
        <p>Gestiona tus pagos de manera segura</p>
        <Link to="/payment" className="cta-button">Realizar Pago</Link>
      </div>
    </div>
  </div>
);

const Scholarship = () => (
  <div className="page-container">
    <h2>Solicitud de Beca</h2>
    <form className="form-container">
      <input type="text" placeholder="Nombre completo" />
      <input type="email" placeholder="Correo electrónico" />
      <select>
        <option value="">Selecciona tu universidad</option>
        <option value="uni1">Universidad 1</option>
        <option value="uni2">Universidad 2</option>
      </select>
      <textarea placeholder="¿Por qué mereces esta beca?"></textarea>
      <button type="submit">Enviar Solicitud</button>
    </form>
  </div>
);

const Loan = () => (
  <div className="page-container">
    <h2>Solicitud de Préstamo</h2>
    <form className="form-container">
      <input type="text" placeholder="Nombre completo" />
      <input type="number" placeholder="Monto solicitado" />
      <select>
        <option value="">Plazo de pago</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
        <option value="36">36 meses</option>
      </select>
      <button type="submit">Solicitar Préstamo</button>
    </form>
  </div>
);

const Payment = () => (
  <div className="page-container">
    <h2>Realizar Pago</h2>
    <form className="form-container">
      <input type="text" placeholder="Número de préstamo" />
      <input type="number" placeholder="Monto a pagar" />
      <button type="submit">Procesar Pago</button>
    </form>
  </div>
);

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      const connected = await isConnected();
      if (!connected) {
        setError('Freighter wallet no detectada. Instálala desde https://www.freighter.app/');
        return;
      }

      const key = await getPublicKey();
      setPublicKey(key);
      setError(null);
    } catch (err) {
      setError('Error al conectar con Freighter');
    }
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">UniPay</div>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/scholarship">Becas</Link>
            <Link to="/loan">Préstamos</Link>
            <Link to="/payment">Pagos</Link>
          </div>
          <div className="wallet-section">
            <button onClick={connectWallet} className="connect-wallet-btn">
              {publicKey ? 'Wallet Conectada' : 'Conectar Wallet'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>

        <footer className="footer">
          <p>© 2024 UniPay - Powered by Stellar</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
