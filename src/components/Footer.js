import React from 'react';
import { ReactComponent as LogoFooter } from '../assets/uap-azul.svg';

const Footer = () => {
  return (
    <footer className="py-5 bg-white border-top mt-auto">
      <div className="container text-center">
        
        {/* ENVOLTORIO CON TAMAÑO CONTROLADO */}
       <div style={{ maxWidth: '200px', margin: '0 auto' }} className="mb-3">
          <LogoFooter className="footer-logo-svg img-fluid" />
        </div>

        <p className="text-muted mb-0">
          &copy; 2026 - Programacion III - UAP. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
export default Footer;