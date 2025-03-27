import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Landing.css';
import heroImage from '../assets/images/hero/hero-banner.svg';
import securityIcon from '../assets/images/icons/security.svg';
import walletIcon from '../assets/images/icons/wallet.svg';
import chartIcon from '../assets/images/icons/chart.svg';
import userIcon from '../assets/images/icons/user.svg';
import studentImage from '../assets/images/content/student.jpg';
import partnersImage from '../assets/images/content/partners.svg';

// Función auxiliar para manejar imágenes faltantes
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300';
};

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
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate">
          <h1>Financia tu Educación con UniPay</h1>
          <p className="subtitle">Plataforma descentralizada de becas y préstamos estudiantiles</p>
          <div className="cta-buttons">
            <Link to="/scholarship" className="cta-button primary">Solicitar Beca</Link>
            <Link to="/request-loan" className="cta-button secondary">Explorar Préstamos</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">$2M+</span>
              <span className="stat-label">En Becas Otorgadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">5000+</span>
              <span className="stat-label">Estudiantes Beneficiados</span>
            </div>
          </div>
        </div>
        <div className="hero-image animate">
          <img 
            src={heroImage} 
            alt="UniPay Platform" 
            onError={handleImageError}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title animate">¿Por qué elegir UniPay?</h2>
        <div className="features-grid">
          <div className="feature-card animate">
            <img 
              src={securityIcon} 
              alt="Seguridad" 
              className="feature-icon"
              onError={handleImageError}
            />
            <h3>Seguridad Blockchain</h3>
            <p>Transacciones seguras y transparentes respaldadas por tecnología blockchain</p>
          </div>
          <div className="feature-card animate">
            <img 
              src={walletIcon} 
              alt="Pagos" 
              className="feature-icon"
              onError={handleImageError}
            />
            <h3>Pagos Instantáneos</h3>
            <p>Recibe tus fondos de manera inmediata sin intermediarios</p>
          </div>
          <div className="feature-card animate">
            <img 
              src={chartIcon} 
              alt="Análisis" 
              className="feature-icon"
              onError={handleImageError}
            />
            <h3>Análisis Inteligente</h3>
            <p>Evaluación justa basada en múltiples factores académicos</p>
          </div>
          <div className="feature-card animate">
            <img 
              src={userIcon} 
              alt="Perfil" 
              className="feature-icon"
              onError={handleImageError}
            />
            <h3>Perfil Verificado</h3>
            <p>Sistema de verificación estudiantil confiable</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title animate">¿Cómo Funciona?</h2>
        <div className="steps-container">
          <div className="step animate">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Conecta tu Wallet</h3>
              <p>Integra tu wallet compatible con Stellar</p>
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
              <h3>Solicita Financiamiento</h3>
              <p>Elige entre becas o préstamos según tus necesidades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <h2 className="section-title animate">Respaldado por</h2>
        <div className="partners-grid animate">
          <div className="partner-card">
            <img src={partnersImage} alt="Universidad Nacional" className="partner-logo" />
            <h3>Universidad Nacional</h3>
            <p>Institución Educativa Líder</p>
          </div>
          <div className="partner-card">
            <img src={partnersImage} alt="Stellar Foundation" className="partner-logo" />
            <h3>Stellar Foundation</h3>
            <p>Tecnología Blockchain</p>
          </div>
          <div className="partner-card">
            <img src={partnersImage} alt="Banco Nacional" className="partner-logo" />
            <h3>Banco Nacional</h3>
            <p>Institución Financiera</p>
          </div>
          <div className="partner-card">
            <img src={partnersImage} alt="Tech Innovation" className="partner-logo" />
            <h3>Tech Innovation</h3>
            <p>Desarrollo Tecnológico</p>
          </div>
          <div className="partner-card">
            <img src={partnersImage} alt="Global Education" className="partner-logo" />
            <h3>Global Education</h3>
            <p>Educación Internacional</p>
          </div>
        </div>

        {/* Reemplazamos testimonios por estadísticas */}
        <div className="stats-grid animate">
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-number">95%</div>
            <div className="stat-label">Tasa de Aprobación</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Estudiantes Activos</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌎</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Universidades Asociadas</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">$5M+</div>
            <div className="stat-label">En Financiamiento</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content animate">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a la revolución de las finanzas estudiantiles descentralizadas</p>
          <Link to="/register" className="cta-button primary">Comenzar Ahora</Link>
        </div>
      </section>
    </div>
  );
}

export default Landing; 