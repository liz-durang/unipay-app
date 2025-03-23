import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="home-content">
                <div className="home-header">
                    <h1>UniPay</h1>
                    <p>Tu plataforma de pagos universitarios</p>
                </div>
                <div className="home-actions">
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/login')}
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => navigate('/register')}
                    >
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home; 