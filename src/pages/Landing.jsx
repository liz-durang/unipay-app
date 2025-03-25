import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Landing.css';

function Landing() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content animate">
          <h1>UniPay</h1>
          <p className="subtitle">Transformando el futuro de las finanzas estudiantiles</p>
          <div className="cta-buttons">
            <Link to="/scholarship" className="cta-button primary">Recibir Beca</Link>
            <Link to="/request-loan" className="cta-button secondary">Solicitar Préstamo</Link>
          </div>
        </div>
        <div className="hero-image animate">
          <img src="/images/hero-illustration.svg" alt="UniPay Platform" />
        </div>
      </section>

      <section className="stats">
        <div className="stat-container animate">
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Estudiantes Beneficiados</p>
          </div>
          <div className="stat-item">
            <h3>$500K+</h3>
            <p>En Becas Otorgadas</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Transparencia</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title animate">¿Por qué elegir UniPay?</h2>
        <div className="features-grid">
          <div className="feature-card animate">
            <div className="feature-icon">
              <img src="/images/security-icon.svg" alt="Seguridad" />
            </div>
            <h3>Becas Seguras</h3>
            <p>Recibe tus becas de forma segura y transparente a través de la blockchain de Stellar</p>
          </div>
          <div className="feature-card animate">
            <div className="feature-icon">
              <img src="/images/speed-icon.svg" alt="Rapidez" />
            </div>
            <h3>Préstamos Rápidos</h3>
            <p>Accede a micropréstamos estudiantiles con procesos simplificados</p>
          </div>
          <div className="feature-card animate">
            <div className="feature-icon">
              <img src="/images/decentralized-icon.svg" alt="Descentralizado" />
            </div>
            <h3>Sin Intermediarios</h3>
            <p>Gestiona tus finanzas estudiantiles de manera descentralizada</p>
          </div>
          <div className="feature-card animate">
            <div className="feature-icon">
              <img src="/images/payment-icon.svg" alt="Pagos" />
            </div>
            <h3>Pagos Flexibles</h3>
            <p>Programa tus pagos de manera flexible y transparente</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title animate">¿Cómo funciona?</h2>
        <div className="steps">
          <div className="step animate">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Conecta tu Wallet</h3>
              <p>Conecta tu wallet de Stellar para empezar</p>
            </div>
          </div>
          <div className="step animate">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Verifica tu Identidad</h3>
              <p>Completa el proceso de verificación estudiantil</p>
            </div>
          </div>
          <div className="step animate">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Accede a Beneficios</h3>
              <p>Recibe becas o solicita préstamos instantáneamente</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content animate">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a la revolución de las finanzas estudiantiles descentralizadas</p>
          <Link to="/scholarship" className="cta-button primary">Comenzar Ahora</Link>
        </div>
      </section>
    </div>
  );
}

export default Landing; 