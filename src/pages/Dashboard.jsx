import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ publicKey }) {
  const [userData, setUserData] = useState({
    balance: 0,
    scholarships: [],
    loans: [],
    nextPayment: null
  });

  useEffect(() => {
    fetchUserData();
  }, [publicKey]);

  const fetchUserData = async () => {
    // Simulación de datos
    setUserData({
      balance: 1500,
      scholarships: [
        { id: 1, amount: 1000, date: '2024-03-01', status: 'Aprobada' },
        { id: 2, amount: 500, date: '2024-02-01', status: 'Recibida' }
      ],
      loans: [
        {
          id: 1,
          amount: 300,
          remainingBalance: 262.50,
          nextPayment: {
            amount: 52.50,
            date: '2024-04-25'
          }
        }
      ],
      nextPayment: {
        amount: 52.50,
        date: '2024-04-25',
        type: 'Préstamo'
      }
    });
  };

  if (!publicKey) {
    return (
      <div className="dashboard-page">
        <div className="wallet-warning">
          <h2>Conecta tu Wallet</h2>
          <p>Para ver tu dashboard, primero necesitas conectar tu wallet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        <div className="dashboard-card balance">
          <h3>Balance Total</h3>
          <div className="balance-amount">${userData.balance}</div>
          <div className="balance-actions">
            <Link to="/request-loan" className="action-button">
              Solicitar Préstamo
            </Link>
            <Link to="/scholarship" className="action-button">
              Solicitar Beca
            </Link>
          </div>
        </div>

        <div className="dashboard-card next-payment">
          <h3>Próximo Pago</h3>
          {userData.nextPayment ? (
            <>
              <div className="payment-amount">
                ${userData.nextPayment.amount}
              </div>
              <div className="payment-date">
                Fecha límite: {userData.nextPayment.date}
              </div>
              <Link to="/pay-loan" className="pay-now-button">
                Pagar Ahora
              </Link>
            </>
          ) : (
            <p>No hay pagos pendientes</p>
          )}
        </div>

        <div className="dashboard-card scholarships">
          <h3>Becas Recientes</h3>
          <div className="scholarship-list">
            {userData.scholarships.map(scholarship => (
              <div key={scholarship.id} className="scholarship-item">
                <div className="scholarship-amount">
                  ${scholarship.amount}
                </div>
                <div className="scholarship-info">
                  <span className="date">{scholarship.date}</span>
                  <span className={`status ${scholarship.status.toLowerCase()}`}>
                    {scholarship.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card loans">
          <h3>Préstamos Activos</h3>
          <div className="loan-list">
            {userData.loans.map(loan => (
              <div key={loan.id} className="loan-item">
                <div className="loan-details">
                  <span className="loan-amount">
                    Préstamo: ${loan.amount}
                  </span>
                  <span className="remaining-balance">
                    Pendiente: ${loan.remainingBalance}
                  </span>
                </div>
                <div className="next-payment-info">
                  Próximo pago: ${loan.nextPayment.amount}
                  <br />
                  <span className="payment-date">
                    {loan.nextPayment.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 