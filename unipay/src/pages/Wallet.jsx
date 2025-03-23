import React from 'react';
import { FaWallet, FaCreditCard, FaHistory, FaPlus, FaChevronRight, FaEllipsisH } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import '../css/Wallet.css';

const Wallet = () => {
  const { user } = useAuth0();
  
  const cards = [
    {
      id: 1,
      type: 'Visa',
      number: '**** **** **** 4589',
      holder: user?.name || 'Usuario',
      expires: '12/25',
      balance: 2854.90,
      color: 'primary'
    },
    {
      id: 2,
      type: 'Mastercard',
      number: '**** **** **** 7842',
      holder: user?.name || 'Usuario',
      expires: '09/24',
      balance: 1540.30,
      color: 'secondary'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      title: 'Tienda del Campus',
      category: 'Libros',
      amount: -58.99,
      date: 'Hoy, 14:30',
      icon: '📚'
    },
    {
      id: 2,
      title: 'Pago de Beca',
      category: 'Ingreso',
      amount: 750.00,
      date: 'Ayer, 09:15',
      icon: '💰'
    },
    {
      id: 3,
      title: 'Cafetería',
      category: 'Comida',
      amount: -12.50,
      date: '22 Nov, 12:45',
      icon: '🍽️'
    }
  ];

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <div className="header-left">
          <h1>
            <FaWallet className="header-icon" />
            Mi Billetera
          </h1>
          <p className="balance-text">Balance Total: <span className="total-balance">${cards.reduce((sum, card) => sum + card.balance, 0).toFixed(2)}</span></p>
        </div>
        <button className="add-card-btn">
          <FaPlus /> Agregar Tarjeta
        </button>
      </div>

      <div className="wallet-content">
        <section className="cards-section">
          <div className="section-header">
            <h2><FaCreditCard /> Mis Tarjetas</h2>
            <button className="view-all-btn">Ver todas <FaChevronRight /></button>
          </div>
          
          <div className="cards-grid">
            {cards.map(card => (
              <div key={card.id} className={`card-item ${card.color}`}>
                <div className="card-header">
                  <span className="card-type">{card.type}</span>
                  <button className="card-menu"><FaEllipsisH /></button>
                </div>
                <div className="card-number">{card.number}</div>
                <div className="card-footer">
                  <div className="card-holder">
                    <span className="label">Titular</span>
                    <span className="value">{card.holder}</span>
                  </div>
                  <div className="card-expires">
                    <span className="label">Expira</span>
                    <span className="value">{card.expires}</span>
                  </div>
                  <div className="card-balance">
                    <span className="label">Balance</span>
                    <span className="value">${card.balance.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="transactions-section">
          <div className="section-header">
            <h2><FaHistory /> Transacciones Recientes</h2>
            <button className="view-all-btn">Ver todas <FaChevronRight /></button>
          </div>

          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-icon">{transaction.icon}</div>
                <div className="transaction-info">
                  <h3>{transaction.title}</h3>
                  <span className="transaction-category">{transaction.category}</span>
                </div>
                <div className="transaction-details">
                  <span className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </span>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Wallet; 