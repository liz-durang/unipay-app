import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaWallet, FaExchangeAlt, FaChartLine, FaBell, FaSearch } from 'react-icons/fa';
import '../css/Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth0();

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>Dashboard</h1>
                    <p className="greeting">¡Bienvenido de nuevo, {user?.given_name || 'Usuario'}!</p>
                </div>
                <div className="header-right">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Buscar transacciones..." />
                    </div>
                    <button className="notifications-btn">
                        <FaBell />
                        <span className="notification-badge">3</span>
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <section className="stats-section">
                    <div className="stat-card primary">
                        <div className="stat-icon">
                            <FaWallet />
                        </div>
                        <div className="stat-info">
                            <h3>Balance Total</h3>
                            <p className="stat-value">$2,854.90</p>
                            <span className="stat-change positive">+15.3% este mes</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div className="stat-icon">
                            <FaExchangeAlt />
                        </div>
                        <div className="stat-info">
                            <h3>Ingresos</h3>
                            <p className="stat-value">$1,258.30</p>
                            <span className="stat-change positive">+8.2% vs mes anterior</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div className="stat-icon">
                            <FaChartLine />
                        </div>
                        <div className="stat-info">
                            <h3>Gastos</h3>
                            <p className="stat-value">$876.40</p>
                            <span className="stat-change negative">-2.4% vs mes anterior</span>
                        </div>
                    </div>
                </section>

                <section className="transactions-section">
                    <div className="section-header">
                        <h2>Transacciones Recientes</h2>
                        <button className="view-all-btn">Ver todas</button>
                    </div>
                    <div className="transactions-list">
                        <div className="transaction-item">
                            <div className="transaction-info">
                                <div className="transaction-icon books">
                                    <FaExchangeAlt />
                                </div>
                                <div className="transaction-details">
                                    <h4>Tienda del Campus</h4>
                                    <p>Libros y Materiales</p>
                                    <span className="transaction-date">Hoy, 14:30</span>
                                </div>
                            </div>
                            <div className="transaction-amount negative">
                                -$58.99
                            </div>
                        </div>

                        <div className="transaction-item">
                            <div className="transaction-info">
                                <div className="transaction-icon scholarship">
                                    <FaWallet />
                                </div>
                                <div className="transaction-details">
                                    <h4>Pago de Beca</h4>
                                    <p>Beca Mensual</p>
                                    <span className="transaction-date">Ayer, 09:15</span>
                                </div>
                            </div>
                            <div className="transaction-amount positive">
                                +$750.00
                            </div>
                        </div>

                        <div className="transaction-item">
                            <div className="transaction-info">
                                <div className="transaction-icon food">
                                    <FaExchangeAlt />
                                </div>
                                <div className="transaction-details">
                                    <h4>Cafetería Universitaria</h4>
                                    <p>Plan de Comidas</p>
                                    <span className="transaction-date">22 Nov, 12:45</span>
                                </div>
                            </div>
                            <div className="transaction-amount negative">
                                -$125.50
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard; 