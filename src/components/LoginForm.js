import React, { useState } from 'react';
import { authService } from '../services/authService';

const LoginForm = ({ onLogin, onGoToRegister }) => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    // Llamamos al servicio
    const response = await authService.login(credentials.email, credentials.password);
    
    // VALIDACIÓN CRÍTICA:
    if (response && response.success) {
      // Pasamos TODO el objeto response a App.js
      onLogin(response); 
    } else {
      setError("Respuesta de servidor inválida");
    }
  } catch (err) {
    // Si el error viene de la API o del Mock reject
    setError(err.message || "Error al conectar con el servidor");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger py-2 text-center">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" name="email" className="form-control" 
              required onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" name="password" className="form-control" 
              required onChange={handleChange} 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
          <p className="text-center mt-3">
            ¿No tienes cuenta? 
            <button 
                type="button" 
                className="btn btn-link p-0 ms-1" 
                onClick={onGoToRegister}
            >
                Regístrate aquí
            </button>
            </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;