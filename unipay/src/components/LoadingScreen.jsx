import React from 'react';
import '../css/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">UniPay</div>
        <div className="loading-spinner"></div>
        <p className="loading-text">Cargando tu experiencia financiera...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 