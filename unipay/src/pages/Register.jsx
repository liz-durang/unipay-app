import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import '../css/Auth.css';

const Register = () => {
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
          <h2>Crear Cuenta</h2>
          <div className="auth-logo">UniPay</div>
        </div>
        
        <div className="auth-form">
          <button 
            onClick={() => loginWithRedirect({ screen_hint: 'signup' })} 
            className="auth-button"
          >
            Registrarse con Auth0
          </button>
        </div>
        
        <div className="auth-description">
          <p>
            Crea tu cuenta de forma segura y rápida.
            Utilizamos Auth0 para garantizar la máxima seguridad en el proceso de registro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 