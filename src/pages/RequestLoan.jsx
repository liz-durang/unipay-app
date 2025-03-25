import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import LoanCalculator from '../components/LoanCalculator';
import './RequestLoan.css';

function RequestLoan({ publicKey }) {
  const navigate = useNavigate();
  const [hasScholarship, setHasScholarship] = useState(false);
  const [scholarshipAmount, setScholarshipAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanDetails, setLoanDetails] = useState({
    amount: 0,
    months: 6,
    interestRate: 3,
    openingFee: 1,
    monthlyPayment: 0,
    totalPayment: 0
  });

  useEffect(() => {
    checkScholarshipHistory();
  }, [publicKey]);

  const checkScholarshipHistory = async () => {
    if (!publicKey) return;
    
    try {
      // Aquí verificaríamos en la blockchain si el usuario ha recibido becas
      // Por ahora simulamos la verificación
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasScholarship(true);
      setScholarshipAmount(1500); // Ejemplo de monto de beca recibida
    } catch (error) {
      console.error('Error verificando historial de becas:', error);
    }
  };

  const handleLoanCalculation = (details) => {
    setLoanDetails(details);
  };

  const handleLoanRequest = async () => {
    if (!publicKey) {
      alert('Por favor conecta tu wallet primero');
      return;
    }

    setIsProcessing(true);
    try {
      // Aquí iría la lógica de interacción con el smart contract
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowModal(true);
    } catch (error) {
      console.error('Error procesando préstamo:', error);
      alert('Error al procesar el préstamo');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="request-loan-page">
        <div className="wallet-warning">
          <h2>Conecta tu Wallet</h2>
          <p>Para solicitar un préstamo, primero necesitas conectar tu wallet.</p>
        </div>
      </div>
    );
  }

  if (!hasScholarship) {
    return (
      <div className="request-loan-page">
        <div className="scholarship-required">
          <h2>Acceso Restringido</h2>
          <p>Solo los estudiantes que han recibido becas pueden solicitar préstamos.</p>
          <button 
            onClick={() => navigate('/scholarship')}
            className="redirect-button"
          >
            Solicitar Beca
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="request-loan-page">
      <div className="loan-container">
        <h2>Solicitud de Micropréstamo Estudiantil</h2>
        
        <div className="scholarship-status">
          <h3>Estado de Elegibilidad</h3>
          <div className="status-card">
            <div className="status-item">
              <span className="status-label">Beca Recibida:</span>
              <span className="status-value">${scholarshipAmount}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Estado:</span>
              <span className="status-badge approved">Aprobado</span>
            </div>
          </div>
        </div>

        <LoanCalculator 
          maxAmount={scholarshipAmount * 2}
          onCalculate={handleLoanCalculation}
        />

        <div className="loan-summary">
          <h3>Resumen del Préstamo</h3>
          <div className="summary-details">
            <div className="summary-item">
              <span>Monto del Préstamo:</span>
              <span>${loanDetails.amount}</span>
            </div>
            <div className="summary-item">
              <span>Tasa de Interés Anual:</span>
              <span>{loanDetails.interestRate}%</span>
            </div>
            <div className="summary-item">
              <span>Comisión por Apertura:</span>
              <span>{loanDetails.openingFee}%</span>
            </div>
            <div className="summary-item">
              <span>Plazo:</span>
              <span>{loanDetails.months} meses</span>
            </div>
            <div className="summary-item highlight">
              <span>Pago Mensual:</span>
              <span>${loanDetails.monthlyPayment}</span>
            </div>
            <div className="summary-item total">
              <span>Total a Pagar:</span>
              <span>${loanDetails.totalPayment}</span>
            </div>
          </div>
        </div>

        <button
          className="request-button"
          onClick={handleLoanRequest}
          disabled={isProcessing || loanDetails.amount === 0}
        >
          {isProcessing ? 'Procesando...' : 'Solicitar Préstamo'}
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡Préstamo Aprobado!"
      >
        <div className="loan-approval">
          <div className="approval-icon">✅</div>
          <p>Tu préstamo ha sido aprobado y los fondos han sido transferidos a tu wallet.</p>
          <div className="transaction-details">
            <p>Monto: ${loanDetails.amount}</p>
            <p>Wallet: {publicKey.slice(0, 6)}...{publicKey.slice(-4)}</p>
          </div>
          <button 
            onClick={() => navigate('/pay-loan')}
            className="next-button"
          >
            Ver Plan de Pagos
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default RequestLoan; 