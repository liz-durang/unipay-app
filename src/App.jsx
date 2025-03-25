import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Keypair } from '@stellar/stellar-sdk';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Scholarship from './pages/Scholarship';
import RequestLoan from './pages/RequestLoan';
import PayLoan from './pages/PayLoan';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  const connectWallet = async () => {
    try {
      const keypair = Keypair.random();
      setPublicKey(keypair.publicKey());
      setWalletConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar walletConnected={walletConnected} connectWallet={connectWallet} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
