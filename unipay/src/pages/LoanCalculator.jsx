import React, { useState, useEffect } from 'react';
import { FaCalculator, FaDollarSign, FaPercentage, FaClock } from 'react-icons/fa';
import '../css/LoanCalculator.css';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [months, setMonths] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [calculatedRate, setCalculatedRate] = useState(3);

  const calculateInterestRate = (amount, months) => {
    // Base rate 3%
    let rate = 3;
    
    // Aumentar por monto
    if (amount > 50000) rate += 1;
    if (amount > 100000) rate += 1;
    if (amount > 500000) rate += 1;
    
    // Aumentar por plazo
    if (months > 6) rate += 1;
    if (months > 12) rate += 1;
    if (months > 18) rate += 2;

    return Math.min(10, rate); // Máximo 10%
  };

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const numberOfPayments = parseFloat(months);
    
    // Calcular tasa según monto y plazo
    const newRate = calculateInterestRate(principal, numberOfPayments);
    setCalculatedRate(newRate);
    
    const monthlyRate = newRate / 100;

    // Fórmula para calcular el pago mensual con interés compuesto
    const payment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(isNaN(payment) ? 0 : payment.toFixed(2));
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, months]);

  const handleAmountChange = (e) => {
    const value = Math.max(10000, Math.min(1000000, Number(e.target.value)));
    setLoanAmount(value);
  };

  const handleMonthsChange = (e) => {
    const value = Math.max(1, Math.min(24, Number(e.target.value)));
    setMonths(value);
  };

  return (
    <div className="loan-calculator-container">
      <div className="calculator-card">
        <div className="calculator-header">
          <FaCalculator className="calculator-icon" />
          <h2>Calculadora de Préstamo</h2>
          <p>El interés aumenta según el monto y plazo</p>
        </div>

        <div className="calculator-form">
          <div className="form-group">
            <label>
              <FaDollarSign className="input-icon" />
              Monto del Préstamo
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={loanAmount}
                onChange={handleAmountChange}
                min="10000"
                max="1000000"
              />
              <span className="input-hint">Mínimo: $10,000</span>
            </div>
          </div>

          <div className="form-group">
            <label>
              <FaClock className="input-icon" />
              Plazo en Meses
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={months}
                onChange={handleMonthsChange}
                min="1"
                max="24"
                step="1"
              />
              <span className="input-hint">1 - 24 meses</span>
            </div>
          </div>

          <div className="results-section">
            <div className="result-item">
              <span className="result-label">Tasa de Interés Calculada</span>
              <span className="result-value interest">{calculatedRate}%</span>
              <span className="result-detail">Basada en monto y plazo</span>
            </div>
            <div className="result-item">
              <span className="result-label">Tu pago mensual será de</span>
              <span className="result-value">${monthlyPayment}</span>
              <span className="result-detail">Cuota fija mensual (capital + interés)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator; 