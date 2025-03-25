import { useState } from 'react';
import { Keypair } from '@stellar/stellar-sdk';
import Modal from '../components/Modal';
import './Scholarship.css';

function Scholarship({ publicKey }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    university: '',
    major: '',
    semester: '',
    gpa: '',
    email: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [scholarshipAmount, setScholarshipAmount] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Aquí iría la lógica de conexión con el smart contract
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulación de proceso
      setScholarshipAmount(1500); // Monto de ejemplo
      setShowModal(true);
      setStep(2);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!publicKey) {
      alert('Por favor conecta tu wallet primero');
      return;
    }

    setIsProcessing(true);
    try {
      // Aquí iría la lógica de interacción con Stellar
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulación
      setStep(3);
    } catch (error) {
      console.error('Error en la transferencia:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="scholarship-page">
      <div className="scholarship-container">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <p>Solicitud</p>
          </div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`} />
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <p>Aprobación</p>
          </div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`} />
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <p>Recibido</p>
          </div>
        </div>

        {step === 1 && (
          <div className="scholarship-form-container animate">
            <h2>Solicitud de Beca</h2>
            <p className="form-description">
              Complete el formulario para iniciar su proceso de solicitud de beca.
              Este será el primer paso para construir su historial en blockchain.
            </p>
            <form onSubmit={handleSubmit} className="scholarship-form">
              <div className="form-group">
                <label htmlFor="fullName">Nombre Completo</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="studentId">Número de Estudiante</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="university">Universidad</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="major">Carrera</label>
                  <input
                    type="text"
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="semester">Semestre Actual</label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}º Semestre</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gpa">Promedio General</label>
                  <input
                    type="number"
                    id="gpa"
                    name="gpa"
                    min="0"
                    max="10"
                    step="0.01"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Enviar Solicitud'}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="scholarship-approval animate">
            <div className="approval-content">
              <h2>¡Felicidades!</h2>
              <div className="scholarship-amount">
                <span className="amount-label">Monto Aprobado:</span>
                <span className="amount-value">${scholarshipAmount}</span>
              </div>
              <p className="approval-message">
                Tu solicitud ha sido aprobada. Este monto será transferido a tu wallet
                de Stellar una vez que confirmes el retiro.
              </p>
              <button 
                onClick={handleWithdraw}
                className="withdraw-button"
                disabled={isProcessing || !publicKey}
              >
                {isProcessing ? 'Procesando...' : 'Retirar Fondos'}
              </button>
              {!publicKey && (
                <p className="warning-message">
                  *Necesitas conectar tu wallet para retirar los fondos
                </p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="scholarship-success animate">
            <div className="success-content">
              <h2>¡Transferencia Exitosa!</h2>
              <div className="success-icon">✅</div>
              <p className="success-message">
                Los fondos han sido transferidos exitosamente a tu wallet.
                Esta transacción ha sido registrada en la blockchain de Stellar
                y contribuirá a tu historial financiero.
              </p>
              <div className="next-steps">
                <h3>Próximos Pasos</h3>
                <p>
                  Con este primer paso, has comenzado a construir tu historial financiero
                  en blockchain. Mantén un buen desempeño académico para acceder a
                  futuros beneficios como micropréstamos estudiantiles.
                </p>
              </div>
              <button 
                onClick={() => window.location.href = '/request-loan'}
                className="next-button"
              >
                Explorar Micropréstamos
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Solicitud Enviada"
      >
        <p>Tu solicitud ha sido recibida y está siendo procesada.</p>
        <p>Por favor, espera mientras verificamos tu información.</p>
      </Modal>
    </div>
  );
}

export default Scholarship; 