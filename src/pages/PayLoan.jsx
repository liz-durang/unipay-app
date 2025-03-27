import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import './PayLoan.css';

function PayLoan({ publicKey }) {
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const stellarDestination = "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // Wallet de Stellar para pagos

  useEffect(() => {
    fetchLoanData();
  }, [publicKey]);

  const fetchLoanData = async () => {
    if (!publicKey) return;

    try {
      // Aquí obtendríamos los datos del préstamo de la blockchain
      // Simulación:
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoanData({
        amount: 300,
        monthlyPayment: 52.50,
        nextPaymentDate: '2024-04-25',
        remainingPayments: 5,
        totalRemaining: 262.50,
        isLate: false
      });
    } catch (error) {
      console.error('Error obteniendo datos del préstamo:', error);
    }
  };

  const handlePayment = async () => {
    if (!publicKey || !loanData) return;

    setIsProcessing(true);
    try {
      // Aquí iría la lógica de pago con Stellar
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowModal(true);
    } catch (error) {
      console.error('Error procesando el pago:', error);
      alert('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="pay-loan-page">
        <div className="wallet-warning">
          <h2>Conecta tu Wallet</h2>
          <p>Para realizar pagos, primero necesitas conectar tu wallet.</p>
        </div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="pay-loan-page">
        <div className="no-loan">
          <h2>Sin Préstamos Activos</h2>
          <p>No tienes préstamos pendientes de pago.</p>
          <button 
            onClick={() => navigate('/request-loan')}
            className="redirect-button"
          >
            Solicitar Préstamo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pay-loan-page">
      <div className="payment-container">
        <h2>Pago de Préstamo</h2>

        <div className="loan-details">
          <div className="detail-card">
            <div className="detail-item">
              <span>Próximo Pago:</span>
              <span className="amount">${loanData.monthlyPayment}</span>
            </div>
            <div className="detail-item">
              <span>Fecha Límite:</span>
              <span className={`date ${loanData.isLate ? 'late' : ''}`}>
                {loanData.nextPaymentDate}
              </span>
            </div>
            <div className="detail-item">
              <span>Pagos Restantes:</span>
              <span>{loanData.remainingPayments}</span>
            </div>
            <div className="detail-item total">
              <span>Saldo Pendiente:</span>
              <span>${loanData.totalRemaining}</span>
            </div>
          </div>
        </div>

        <div className="payment-instructions">
          <h3>Instrucciones de Pago</h3>
          <p>Para realizar tu pago, envía la cantidad exacta a la siguiente wallet de Stellar:</p>
          <div className="wallet-address">
            <code>{stellarDestination}</code>
            <button 
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(stellarDestination)}
            >
              Copiar
            </button>
          </div>
        </div>

        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Procesando...' : `Pagar $${loanData.monthlyPayment}`}
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡Pago Exitoso!"
      >
        <div className="payment-success">
          <div className="success-icon">✅</div>
          <p>Tu pago ha sido procesado correctamente.</p>
          <div className="payment-details">
            <p>Monto: ${loanData?.monthlyPayment}</p>
            <p>Nuevo Saldo: ${(loanData?.totalRemaining - loanData?.monthlyPayment).toFixed(2)}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PayLoan; 