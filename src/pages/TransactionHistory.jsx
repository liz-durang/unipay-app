import { useState, useEffect } from 'react';
import './TransactionHistory.css';

function TransactionHistory({ publicKey }) {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, [publicKey, filter]);

  const fetchTransactions = async () => {
    // Simulación de datos
    const mockTransactions = [
      {
        id: 1,
        type: 'scholarship',
        amount: 1000,
        date: '2024-03-01',
        status: 'completed',
        description: 'Beca académica recibida'
      },
      {
        id: 2,
        type: 'loan',
        amount: 300,
        date: '2024-03-15',
        status: 'completed',
        description: 'Préstamo estudiantil'
      },
      {
        id: 3,
        type: 'payment',
        amount: -52.50,
        date: '2024-03-25',
        status: 'completed',
        description: 'Pago de préstamo'
      }
    ];

    setTransactions(
      filter === 'all' 
        ? mockTransactions 
        : mockTransactions.filter(t => t.type === filter)
    );
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'scholarship':
        return '🎓';
      case 'loan':
        return '💰';
      case 'payment':
        return '💳';
      default:
        return '📝';
    }
  };

  return (
    <div className="transaction-history-page">
      <div className="transaction-container">
        <h2>Historial de Transacciones</h2>
        
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button 
            className={`filter-button ${filter === 'scholarship' ? 'active' : ''}`}
            onClick={() => setFilter('scholarship')}
          >
            Becas
          </button>
          <button 
            className={`filter-button ${filter === 'loan' ? 'active' : ''}`}
            onClick={() => setFilter('loan')}
          >
            Préstamos
          </button>
          <button 
            className={`filter-button ${filter === 'payment' ? 'active' : ''}`}
            onClick={() => setFilter('payment')}
          >
            Pagos
          </button>
        </div>

        <div className="transactions-list">
          {transactions.map(transaction => (
            <div 
              key={transaction.id} 
              className={`transaction-item ${transaction.type}`}
            >
              <div className="transaction-icon">
                {getTransactionIcon(transaction.type)}
              </div>
              <div className="transaction-info">
                <div className="transaction-header">
                  <span className="transaction-description">
                    {transaction.description}
                  </span>
                  <span className={`transaction-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}
                  </span>
                </div>
                <div className="transaction-details">
                  <span className="transaction-date">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span className={`transaction-status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory; 