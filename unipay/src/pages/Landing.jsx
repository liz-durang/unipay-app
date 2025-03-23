import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaGraduationCap, FaWallet, FaChartLine, FaShieldAlt, FaUsers, FaQuestionCircle } from 'react-icons/fa';
import '../css/Landing.css';

const Landing = () => {
    const { loginWithRedirect } = useAuth0();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
        setIsNavOpen(false);
    };

    return (
        <div className="landing">
            {/* Navbar */}
            <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-brand">
                    <img src="../assets/logo-unipay-app-no-background.png" alt="UniPay Logo" className="nav-logo" />
                </div>

                <button className="nav-toggle" onClick={toggleNav}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-links ${isNavOpen ? 'open' : ''}`}>
                    <button onClick={() => scrollToSection('features')}>Características</button>
                    <button onClick={() => scrollToSection('about')}>Nosotros</button>
                    <button onClick={() => scrollToSection('benefits')}>Beneficios</button>
                    <button onClick={() => scrollToSection('faq')}>FAQ</button>
                    <button className="nav-cta" onClick={() => loginWithRedirect()}>
                        Iniciar Sesión
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Tu Solución Financiera Universitaria</h1>
                    <p>Gestiona tus finanzas universitarias de manera inteligente con UniPay. La plataforma diseñada específicamente para estudiantes.</p>
                    <button className="cta-button" onClick={() => loginWithRedirect()}>
                        Comienza Gratis
                    </button>
                </div>
                <div className="hero-image">
                    <img src="/hero-image.png" alt="UniPay Dashboard Preview" />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <h2>Características Principales</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <FaWallet className="feature-icon" />
                        <h3>Gestión de Pagos</h3>
                        <p>Organiza y programa tus pagos universitarios de manera eficiente.</p>
                    </div>
                    <div className="feature-card">
                        <FaChartLine className="feature-icon" />
                        <h3>Análisis Financiero</h3>
                        <p>Visualiza y analiza tus gastos con gráficos intuitivos.</p>
                    </div>
                    <div className="feature-card">
                        <FaGraduationCap className="feature-icon" />
                        <h3>Becas y Ayudas</h3>
                        <p>Accede a información sobre becas y ayudas financieras disponibles.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="about-content">
                    <h2>Sobre UniPay</h2>
                    <p>UniPay nació de la necesidad de simplificar la gestión financiera para estudiantes universitarios. Nuestra misión es proporcionar herramientas financieras accesibles y fáciles de usar que ayuden a los estudiantes a tomar mejores decisiones financieras.</p>
                    <div className="stats">
                        <div className="stat-item">
                            <h3>10,000+</h3>
                            <p>Estudiantes Activos</p>
                        </div>
                        <div className="stat-item">
                            <h3>50+</h3>
                            <p>Universidades</p>
                        </div>
                        <div className="stat-item">
                            <h3>98%</h3>
                            <p>Satisfacción</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="benefits">
                <h2>Beneficios para Estudiantes</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <FaShieldAlt className="benefit-icon" />
                        <h3>Seguridad Garantizada</h3>
                        <p>Tus datos financieros están protegidos con la más alta tecnología de encriptación.</p>
                    </div>
                    <div className="benefit-card">
                        <FaUsers className="benefit-icon" />
                        <h3>Comunidad Estudiantil</h3>
                        <p>Conecta con otros estudiantes y comparte consejos financieros.</p>
                    </div>
                    <div className="benefit-card">
                        <FaQuestionCircle className="benefit-icon" />
                        <h3>Soporte 24/7</h3>
                        <p>Asistencia personalizada cuando la necesites.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section mejorado */}
            <section id="faq" className="faq">
                <h2>Preguntas Frecuentes</h2>
                <div className="faq-grid">
                    <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <h3>¿Cómo funciona UniPay?</h3>
                        <p>UniPay es una plataforma que te permite gestionar tus finanzas universitarias de manera integral. Puedes programar pagos, hacer seguimiento de gastos y recibir alertas importantes.</p>
                    </div>
                    <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <h3>¿Es seguro usar UniPay?</h3>
                        <p>Sí, utilizamos tecnología de encriptación de nivel bancario y cumplimos con todos los estándares de seguridad financiera.</p>
                    </div>
                    <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <h3>¿Cuánto cuesta usar UniPay?</h3>
                        <p>UniPay es completamente gratuito para estudiantes universitarios. No hay costos ocultos ni cargos adicionales.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section mejorado */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>¿Listo para comenzar?</h2>
                    <p>Únete a miles de estudiantes que ya están gestionando mejor sus finanzas</p>
                    <button className="cta-button" onClick={() => loginWithRedirect()}>
                        Crear Cuenta Gratis
                    </button>
                </div>
                <div className="cta-background"></div>
            </section>
        </div>
    );
};

export default Landing;