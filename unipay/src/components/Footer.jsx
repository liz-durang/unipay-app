import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>UniPay</h4>
          <ul className="footer-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#caracteristicas">Características</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Recursos</h4>
          <ul className="footer-links">
            <li><a href="/ayuda">Centro de Ayuda</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/tutoriales">Tutoriales</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="/privacidad">Política de Privacidad</a></li>
            <li><a href="/terminos">Términos de Servicio</a></li>
            <li><a href="/seguridad">Seguridad</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="footer-links">
            <li><a href="mailto:soporte@unipay.com">soporte@unipay.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UniPay. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
  