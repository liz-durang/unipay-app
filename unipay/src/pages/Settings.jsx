import React, { useState, useEffect } from 'react';
import { getPublicKey, isConnected, signTransaction } from '@stellar/freighter-api';
import { Server } from 'stellar-sdk';
import { FaWallet, FaCog, FaExchangeAlt, FaHistory } from 'react-icons/fa';
import '../css/Settings.css';

const Settings = () => {
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet');

  const server = new Server('https://horizon-testnet.stellar.org');

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const connected = await isConnected();
      if (connected) {
        const key = await getPublicKey();
        setPublicKey(key);
        await fetchBalance(key);
      }
    } catch (err) {
      console.error('Error al verificar la conexión:', err);
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!window.freighter) {
        setError('Por favor, instala Freighter desde https://www.freighter.app/');
        return;
      }

      const connected = await isConnected();
      if (!connected) {
        setError('Por favor, conecta tu billetera Freighter');
        return;
      }

      const key = await getPublicKey();
      setPublicKey(key);
      await fetchBalance(key);
    } catch (err) {
      setError('Error al conectar la billetera: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBalance = async (address) => {
    try {
      const account = await server.loadAccount(address);
      const xlmBalance = account.balances.find(b => b.asset_type === 'native');
      setBalance(xlmBalance ? xlmBalance.balance : '0');
    } catch (err) {
      console.error('Error al obtener el balance:', err);
      setBalance('0');
    }
  };

  const disconnectWallet = () => {
    setPublicKey('');
    setBalance(null);
  };

  const renderWalletTab = () => (
    <div className="wallet-section">
      <div className="wallet-status">
        {publicKey ? (
          <>
            <div className="wallet-info">
              <h3>Billetera Conectada</h3>
              <p className="public-key">
                {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
              </p>
              <p className="balance">
                Balance: <span>{balance} XLM</span>
              </p>
            </div>
            <button onClick={disconnectWallet} className="disconnect-btn">
              Desconectar
            </button>
          </>
        ) : (
          <div className="connect-wallet">
            <FaWallet className="wallet-icon" />
            <h3>Conecta tu Billetera</h3>
            <p>Conecta tu billetera Freighter para empezar a usar UniPay</p>
            <button
              onClick={connectWallet}
              className="connect-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Conectando...' : 'Conectar Billetera'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="preferences-section">
      <h3>Preferencias</h3>
      <div className="preferences-form">
        <div className="form-group">
          <label>Moneda Predeterminada</label>
          <select defaultValue="XLM">
            <option value="XLM">Stellar Lumens (XLM)</option>
            <option value="USDC">USD Coin (USDC)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Red</label>
          <select defaultValue="testnet">
            <option value="testnet">Testnet</option>
            <option value="mainnet">Mainnet</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Configuración</h2>
        <p>Administra tu billetera y preferencias</p>
      </div>

      <div className="settings-nav">
        <button
          className={`nav-button ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          <FaWallet /> Billetera
        </button>
        <button
          className={`nav-button ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <FaCog /> Preferencias
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'wallet' && renderWalletTab()}
        {activeTab === 'preferences' && renderPreferencesTab()}
      </div>
    </div>
  );
};

export default Settings; 