import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Keypair } from '@stellar/stellar-sdk';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Scholarship from './pages/Scholarship';
import RequestLoan from './pages/RequestLoan';
import PayLoan from './pages/PayLoan';
import TransactionHistory from './pages/TransactionHistory';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const connectWallet = async () => {
    try {
      if (walletConnected) {
        // Si ya está conectada, desconectar
        setPublicKey('');
        setWalletConnected(false);
      } else {
        // Si no está conectada, conectar
        const keypair = Keypair.random();
        setPublicKey(keypair.publicKey());
        setWalletConnected(true);
      }
    } catch (error) {
      console.error('Error con la wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setPublicKey('');
    setWalletConnected(false);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar 
          walletConnected={walletConnected} 
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          publicKey={publicKey}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard publicKey={publicKey} />} />
            <Route 
              path="/scholarship" 
              element={<Scholarship publicKey={publicKey} />} 
            />
            <Route 
              path="/request-loan" 
              element={<RequestLoan publicKey={publicKey} />} 
            />
            <Route 
              path="/pay-loan" 
              element={<PayLoan publicKey={publicKey} />} 
            />
            <Route path="/transactions" element={<TransactionHistory publicKey={publicKey} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
