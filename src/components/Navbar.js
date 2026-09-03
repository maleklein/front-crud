import React from 'react';
import { ReactComponent as LogoNav } from '../assets/uap-blanco.svg';

const Navbar = ({ isAuthenticated, user, onLogout, setView }) => {
  return (
    // CAMBIO: bg-white y border-bottom para dar definición
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm py-2 border-bottom">
      <div className="container">
        {/* LOGO Y MARCA */}
        <div 
          className="navbar-brand d-flex align-items-center text-dark" 
          style={{ cursor: 'pointer' }} 
          onClick={() => setView('inicio')}
        >
          {/* El logo azul ahora se verá perfecto sobre el fondo blanco */}
          <LogoNav style={{ width: '180px', height: '40px', marginRight: '10px' }} />
        </div>

        {/* BOTÓN MÓVIL */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {isAuthenticated && user ? (
              <>
                {/* MENU USUARIOS (Texto oscuro) */}
                {user.role === 'admin' && (
                  <li className="nav-item dropdown">
                    <button 
                      className="nav-link dropdown-toggle btn btn-link shadow-none text-dark border-0" 
                      id="userDropdown" 
                      data-bs-toggle="dropdown"
                    >
                      Usuarios
                    </button>
                    {/* CAMBIO: Quitamos dropdown-menu-dark para que sea blanco */}
                    <ul className="dropdown-menu shadow border-0" aria-labelledby="userDropdown">
                      <li><button className="dropdown-item" onClick={() => setView('usuarios-listado')}>Listado</button></li>
                      <li><button className="dropdown-item" onClick={() => setView('usuarios-gestion')}>Gestión</button></li>
                    </ul>
                  </li>
                )}

                {/* MENU TRABAJOS */}
                <li className="nav-item dropdown">
                  <button 
                    className="nav-link dropdown-toggle btn btn-link shadow-none text-dark border-0" 
                    id="workDropdown" 
                    data-bs-toggle="dropdown"
                  >
                    Trabajos
                  </button>
                  <ul className="dropdown-menu shadow border-0" aria-labelledby="workDropdown">
                    <li><button className="dropdown-item" onClick={() => setView('trabajos-historial')}>Historial</button></li>
                    <li><button className="dropdown-item" onClick={() => setView('trabajos-gestion')}>Gestión</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={() => setView('trabajos-nuevo')}>Nuevo Trabajo</button></li>
                  </ul>
                </li>

                {/* PERFIL DEL USUARIO (Contraste oscuro) */}
                <li className="nav-item ms-lg-3 d-flex align-items-center">
                  <div className="d-flex align-items-center border-start border-light ps-3">
                    <div className="text-end me-2 text-dark d-none d-sm-block">
                      <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{user.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{user.role}</div>
                    </div>
                    
                    <img 
                      src={`data:image/png;base64,${user.perfilImageBase64}`} 
                      alt="Avatar"
                      className="rounded-circle border border-2 border-primary"
                      style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                    />

                    <button 
                      className="btn btn-link text-danger ms-2 p-0 shadow-none text-decoration-none" 
                      onClick={onLogout} 
                    >
                      <small>Salir</small>
                    </button>
                  </div>
                </li>
              </>
            ) : (
              /* LOGIN/REGISTRO EN MODO CLARO */
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-dark border-0" onClick={() => setView('login')}>Login</button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary btn-sm ms-lg-2 px-3" onClick={() => setView('register')}>Registro</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;