import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import '../css/Auth.css';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Cargando...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Iniciar Sesión</h2>
          <div className="auth-logo">UniPay</div>
        </div>
        
        <div className="auth-form">
          <button 
            onClick={() => loginWithRedirect()} 
            className="auth-button"
          >
            Iniciar Sesión con Auth0
          </button>
        </div>
        
        <div className="auth-description">
          <p>
            Inicia sesión de forma segura con tu cuenta preferida.
            Utilizamos Auth0 para garantizar la máxima seguridad en tus datos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 