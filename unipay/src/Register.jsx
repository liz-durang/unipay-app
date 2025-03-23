import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './css/Login.css';

const Register = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Limpiar error cuando el usuario empieza a escribir
        setError('');
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('El nombre es requerido');
            return false;
        }
        if (!formData.name.includes(' ')) {
            setError('Por favor, ingresa tu nombre completo (nombre y apellido)');
            return false;
        }
        if (!formData.email.trim()) {
            setError('El email es requerido');
            return false;
        }
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setError('Por favor, ingresa un email válido');
            return false;
        }
        if (formData.password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return false;
        }
        if (!/[A-Z]/.test(formData.password)) {
            setError('La contraseña debe contener al menos una letra mayúscula');
            return false;
        }
        if (!/[0-9]/.test(formData.password)) {
            setError('La contraseña debe contener al menos un número');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('Error en el registro:', err);
            if (err.message.includes('already exists')) {
                setError('Este email ya está registrado. Por favor, usa otro email o inicia sesión.');
            } else if (err.message.includes('conexión')) {
                setError('Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.');
            } else {
                setError(err.message || 'Error al crear la cuenta. Por favor, intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Crear cuenta</h2>
                    <p>Únete a UniPay y comienza a gestionar tus finanzas</p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre completo</label>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nombre y Apellido"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
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
                        <small className="password-requirements">
                            Mínimo 8 caracteres, una mayúscula y un número
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <div className="input-group">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register; 