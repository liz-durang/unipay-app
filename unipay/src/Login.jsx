import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './css/Login.css';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(formData.email, formData.password);
            if (success) {
                window.location.href = '/dashboard';
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Bienvenido de nuevo</h2>
                    <p>Ingresa a tu cuenta de UniPay</p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-group">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" disabled={loading} /> Recordarme
                        </label>
                        <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
