import { useState, useEffect } from 'react';
import './LoanCalculator.css';

function LoanCalculator({ maxAmount, onCalculate }) {
  const [amount, setAmount] = useState(0);
  const [months, setMonths] = useState(3);
  const interestRate = 3; // 3% anual fijo
  const openingFee = 1; // 1% de comisión por apertura
  const monthOptions = [2, 3, 4, 5, 6];

  useEffect(() => {
    calculateLoan();
  }, [amount, months]);

  const calculateLoan = () => {
    if (amount === 0) return;

    const fee = (amount * openingFee) / 100;
    const monthlyRate = (interestRate / 12) / 100;
    const totalAmount = amount + fee;
    
    // Fórmula para calcular el pago mensual con interés compuesto
    const monthlyPayment = (
      totalAmount * monthlyRate * Math.pow(1 + monthlyRate, months)
    ) / (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = monthlyPayment * months;

    onCalculate({
      amount,
      months,
      interestRate,
      openingFee,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });
  };

  return (
    <div className="loan-calculator">
      <h3>Calculadora de Préstamo</h3>
      
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="amount">Monto del Préstamo</label>
          <div className="amount-input">
            <span className="currency">$</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Math.min(Number(e.target.value), maxAmount))}
              max={maxAmount}
              min="0"
              step="100"
            />
          </div>
          <div className="amount-slider">
            <input
              type="range"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
              max={maxAmount}
              step="100"
            />
            <div className="slider-labels">
              <span>$0</span>
              <span>${maxAmount}</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="months">Plazo (meses)</label>
          <div className="months-options">
            {monthOptions.map((option) => (
              <button
                key={option}
                className={`month-option ${months === option ? 'selected' : ''}`}
                onClick={() => setMonths(option)}
              >
                <span className="month-number">{option}</span>
                <span className="month-label">meses</span>
                <span className="payment-estimate">
                  ${((amount * (1 + (interestRate/100))) / option).toFixed(2)}/mes
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="calculator-info">
          <div className="info-item">
            <span>Tasa de Interés Anual:</span>
            <span className="highlight">{interestRate}%</span>
          </div>
          <div className="info-item">
            <span>Comisión por Apertura:</span>
            <span className="highlight">{openingFee}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanCalculator; 